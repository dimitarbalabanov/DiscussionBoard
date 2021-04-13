using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, GetAllPostsResponse>
    {
        private const int PageSize = 10;
        private const string SqlDateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff";

        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;

        public GetAllPostsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IAuthenticatedUserService authUserService)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
        }

        public async Task<GetAllPostsResponse> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;
            var query = string.Empty;
            Enum.TryParse(request.Sort, true, out Sort sort);
            if (sort != Sort.Top)
            {
                var ord = sort == Sort.New ? "DESC" : "ASC";
                //query =
                //   $@"SELECT p.Id,
                //             p.Title,
                //             p.Content,
                //             p.CreatedOn,
                //             p.ModifiedOn,
                //             u.UserName               AS CreatorUserName,
                //             f.Title                  AS ForumTitle,
                //             p.ForumId,
                //             pm.Url                   AS MediaUrl,
                //             (SELECT Count(*)
                //              FROM   Comments AS c
                //              WHERE  p.Id = c.PostId) AS CommentsCount,
                //             (SELECT Sum(Cast(p.Type AS int))
                //              FROM   PostVotes AS p
                //              WHERE  p.Id = p.PostId) AS VotesScore,
                //             Cast(CASE
                //                    WHEN p.CreatorId = '{userId}' THEN 1
                //                    ELSE 0
                //                  END AS BIT)        AS IsCreator
                //      FROM   (SELECT TOP({PageSize}) pp.Id,
                //                                     pp.Title,
                //                                     pp.Content,
                //                                     pp.CreatedOn,
                //                                     pp.ModifiedOn,
                //                                     pp.ForumId,
                //                                     pp.CreatorId
                //              FROM   Posts AS pp
                //              WHERE  ( pp.ForumId = {(int)request.ForumId} )";
                //if (request.Cursor != null)
                //{
                //    var cursor = CursorPagingExtensions.DecodeSortCursor(request.Cursor);
                //    query = query +
                //                        $@"AND ( pp.CreatedOn < '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                //                                                OR ( pp.CreatedOn = '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                //                                                     AND pp.Id > {cursor.Item1} ) )";
                //}

                query =
                   $@"SELECT p.Id,
                             p.Title,
                             p.Content,
                             p.CreatedOn,
                             p.ModifiedOn,
                             u.UserName               AS CreatorUserName,
                             f.Title                  AS ForumTitle,
                             p.ForumId,
                             pm.Url                   AS MediaUrl,
                             (SELECT Count(*)
                              FROM   Comments AS c
                              WHERE  p.Id = c.PostId) AS CommentsCount,
                             (SELECT Sum(Cast(p.Type AS int))
                              FROM   PostVotes AS p
                              WHERE  p.Id = p.PostId) AS VotesScore,
                             Cast(CASE
                                    WHEN p.CreatorId = '{userId}' THEN 1
                                    ELSE 0
                                  END AS BIT)        AS IsCreator
                      FROM   (SELECT TOP({PageSize}) pp.Id,
                                                     pp.Title,
                                                     pp.Content,
                                                     pp.CreatedOn,
                                                     pp.ModifiedOn,
                                                     pp.ForumId,
                                                     pp.CreatorId
                              FROM   Posts AS pp ";
                var conditions = new List<string>();
                if (request.ForumId != null)
                {
                    conditions.Add($" ( pp.ForumId = {(int)request.ForumId} ) ");
                }

                if (request.Cursor != null)
                {
                    var cursor = CursorPagingExtensions.DecodeSortCursor(request.Cursor);
                    conditions.Add($@" ( pp.CreatedOn < '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                                            OR ( pp.CreatedOn = '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                                                    AND pp.Id > {cursor.Item1} ) ) ");
                }

                var filter = string.Empty;
                if (conditions.Count == 1)
                {
                    filter = "WHERE" + conditions[0];
                }
                else if (conditions.Count == 2)
                {
                    filter = "WHERE" + conditions[0] + "AND" + conditions[1];
                }

                if (filter != "")
                {
                    query = query + filter;
                }

                query = query + 
                          $@" ORDER  BY pp.CreatedOn {ord},
                                        pp.Id ASC) AS p
                             INNER JOIN AspNetUsers AS u
                                     ON p.CreatorId = u.Id
                             INNER JOIN Forums AS f
                                     ON p.ForumId = f.Id
                              LEFT JOIN PostMedias AS pm
                                     ON p.Id = pm.PostId ";
            }
            else
            {
                Enum.TryParse(request.Top, true, out Interval top);
                query =
                   $@"SELECT TOP({PageSize}) 
                                     p.Id,
                                     p.Title,
                                     p.Content,
                                     p.CreatedOn,
                                     p.ModifiedOn,
                                     u.UserName               AS CreatorUserName,
                                     p.ForumId,
                                     f.Title                  AS ForumTitle,
                                     pm.Url                   AS MediaUrl,
                                     (SELECT Count(*)
                                      FROM   Comments AS c
                                      WHERE  p.Id = c.PostId) AS CommentsCount,
                                     p.VotesScore
                      FROM   (SELECT sp.Id,
                                     sp.Content,
                                     sp.CreatedOn,
                                     sp.CreatorId,
                                     sp.ForumId,
                                     sp.ModifiedOn,
                                     sp.Title,
                                     (SELECT Sum(Cast(pv.Type AS int))
                                      FROM   PostVotes AS pv
                                      WHERE  sp.Id = pv.PostId) AS VotesScore
                              FROM   Posts AS sp
                              WHERE  ( sp.ForumId = {(int)request.ForumId} )
                                     AND ( sp.CreatedOn > '{top.ToDateTimeString()}' )) AS p
                             INNER JOIN AspNetUsers AS u
                                     ON p.CreatorId = u.Id
                             INNER JOIN Forums AS f
                                     ON p.ForumId = f.Id
                              LEFT JOIN PostMedias AS pm
                                     ON p.Id = pm.PostId";
                if (request.Cursor != null)
                {
                    var cursor = CursorPagingExtensions.DecodeTopCursor(request.Cursor);
                    query = query +
                        $@" WHERE  p.VotesScore > {cursor.Item3}
                              OR ( p.VotesScore = {cursor.Item3}
                                   AND p.CreatedOn > '{cursor.Item2.ToString(SqlDateTimeFormat)}' )
                              OR ( p.VotesScore = {cursor.Item3}
                                   AND p.CreatedOn = '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                                   AND p.Id > {cursor.Item1} )";
                }
                query = query + 
                   $@" ORDER  BY p.VotesScore DESC,
                                p.CreatedOn ASC,
                                p.Id ASC ";
            }

            var posts = await _readDbConnection.QueryAsync<PostDto>(query);

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

            if (dict != null)
            {
                posts = dict.Values.ToList();
            }

            var response = new GetAllPostsResponse { Posts = posts };
            return response;
        }
    }
}