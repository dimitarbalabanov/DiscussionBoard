using DiscussionBoard.Application.Common.Commands;
using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Common.Responses;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PagedResponse<GetAllPostsResponse>>
    {
        private const int PageSize = 10;
        private const string SelectAlias = "p";
        private const string InnerSelectAlias = "pp";

        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;

        public GetAllPostsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IAuthenticatedUserService authUserService)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
        }

        public async Task<PagedResponse<GetAllPostsResponse>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {

            var postsQuery = new StringBuilder();
            postsQuery.AppendLine(
                @"SELECT p.Id,
                         p.Title,
                         p.Content,
                         p.CreatedOn,
                         p.ModifiedOn,
                         u.UserName AS CreatorUserName,
                         f.Title    AS ForumTitle,
                         p.ForumId,
                         pm.Url     AS MediaUrl,");

            postsQuery.AppendLine(SqlQueriesHelper.SumCommentsCount(SelectAlias) + ",");
            
            var userId = _authUserService.UserId;
            if (userId != null)
            {
                postsQuery.AppendLine(SqlQueriesHelper.IsCreator<Post>(SelectAlias, userId) + ",");
            }

            Enum.TryParse(request.Sort, true, out Order order);
            postsQuery.AppendLine(order == Order.Top ? $"{SelectAlias}.VotesScore" : SqlQueriesHelper.SumVotesScore<Post, PostVote>(SelectAlias));

            postsQuery.AppendLine(
                $@"FROM   (SELECT TOP({PageSize}) pp.Id,
                                                  pp.Title,
                                                  pp.Content,
                                                  pp.CreatedOn,
                                                  pp.ModifiedOn,
                                                  pp.ForumId,
                                                  pp.CreatorId");
            if (order == Order.Top)
            {
                postsQuery.Append(",");
                postsQuery.AppendLine(SqlQueriesHelper.SumVotesScore<Post, PostVote>(InnerSelectAlias));
            }

            postsQuery.AppendLine(
                @"        FROM   Posts AS pp");

            if (request.ForumId != null)
            {
                postsQuery.AppendLine($"WHERE ( pp.ForumId = {(int)request.ForumId} )");
            }

            FilterAndOrder.ToSql(request.Cursor, request.Top, postsQuery, order, InnerSelectAlias, request.ForumId == null);

            postsQuery.AppendLine(
                @") AS p
                         INNER JOIN AspNetUsers AS u
                                 ON p.CreatorId = u.Id
                         INNER JOIN Forums AS f
                                 ON p.ForumId = f.Id
                          LEFT JOIN PostMedias AS pm
                                 ON p.Id = pm.PostId ");

            var posts = await _readDbConnection.QueryAsync<PostDto>(postsQuery.ToString());

            Dictionary<int, PostDto> dict = null;
            if (userId != null)
            {
                dict = posts.ToDictionary(x => x.Id, x => x);
                var postIds = string.Join(", ", posts.Select(p => p.Id).ToArray());

                var postVotesQuery =
                    $@"SELECT pv.Id, pv.PostId, pv.Type
                    FROM PostVotes AS pv
                    WHERE pv.PostId IN ({postIds}) AND (pv.CreatorId = '{userId}')";
                var votes = await _readDbConnection.QueryAsync<AllPostsPostVoteDto>(postVotesQuery);

                foreach (var v in votes)
                {
                    dict[v.PostId].VoteId = v.Id;
                    dict[v.PostId].VoteType = v.Type;
                }

                var savedPostsQuery =
                    $@"SELECT ups.PostId
                    FROM UserPostSaves AS ups
                    WHERE ups.PostId IN ({postIds}) AND (ups.UserId = '{userId}')";
                var savedPostIds = await _readDbConnection.QueryAsync<int>(savedPostsQuery);

                foreach (var sp in savedPostIds)
                {
                    dict[sp].IsSaved = true;
                }
            }

            posts = dict != null ? dict.Values.ToList() : posts;

            var response = new PagedResponse<GetAllPostsResponse>
            {
                Data = new GetAllPostsResponse { Posts = posts },
                Cursor = posts.Count > 0 ? posts[posts.Count - 1].Id : default(int?)
            };

            return response;
        }
    }
}
//SELECT p.Id,
//       p.Title,
//       p.Content,
//       p.CreatedOn,
//       p.ModifiedOn,
//       u.UserName               AS CreatorUserName,
//       f.Title                  AS ForumTitle,
//       p.ForumId,
//       pm.Url                   AS MediaUrl,
//       (SELECT Count(*)
//        FROM   Comments AS c
//        WHERE  p.Id = c.PostId) AS CommentsCount,
//       (SELECT Sum(Cast(p.Type AS int))
//        FROM   PostVotes AS p
//        WHERE  p.Id = p.PostId) AS VotesScore
//FROM   (SELECT TOP(10) ip.Id,
//                       ip.Title,
//                       ip.Content,
//                       ip.CreatedOn,
//                       ip.ModifiedOn,
//                       ip.ForumId,
//                       ip.CreatorId
//        FROM   Posts AS ip
//        WHERE  ( ip.ForumId = 2 )
//               AND ( ip.Id > 20 )
//        ORDER  BY ip.CreatedOn DESC) AS p
//       INNER JOIN AspNetUsers AS u
//               ON p.CreatorId = u.Id
//       INNER JOIN Forums AS f
//               ON p.ForumId = f.Id
//       LEFT JOIN PostMedias AS pm
//              ON p.Id = pm.PostId 

//SELECT p.Id,
//       p.Title,
//       p.Content,
//       p.CreatedOn,
//       p.ModifiedOn,
//       u.UserName               AS CreatorUserName,
//       p.ForumId,
//       f.Title                  AS ForumTitle,
//       pm.Url                   AS MediaUrl,
//       (SELECT Count(*)
//        FROM   Comments AS c
//        WHERE  p.Id = c.PostId) AS CommentsCount,
//       p.VotesScore
//FROM   (SELECT TOP(10) sp.Id,
//                       sp.Content,
//                       sp.CreatedOn,
//                       sp.CreatorId,
//                       sp.ForumId,
//                       sp.ModifiedOn,
//                       sp.Title,
//                       (SELECT Sum(Cast(pv.Type AS int))
//                        FROM   PostVotes AS pv
//                        WHERE  sp.Id = pv.PostId) AS VotesScore
//        FROM   Posts AS sp
//        WHERE  ( ( sp.CreatedOn >= '' )
//                 AND ( sp.ForumId = 2 ) )
//               AND ( sp.Id > 20 )
//        ORDER  BY VotesScore DESC) AS p
//       INNER JOIN AspNetUsers AS u
//               ON p.CreatorId = u.Id
//       INNER JOIN Forums AS f
//               ON p.ForumId = f.Id
//       LEFT JOIN PostMedias AS pm
//              ON p.Id = pm.PostId 