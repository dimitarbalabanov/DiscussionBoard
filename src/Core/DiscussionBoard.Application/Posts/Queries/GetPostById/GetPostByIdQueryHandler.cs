using DiscussionBoard.Application.Common.Commands;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, GetPostByIdResponse>
    {
        private const string SelectAlias = "p";
        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;

        public GetPostByIdQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IAuthenticatedUserService authUserService)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
        }

        public async Task<GetPostByIdResponse> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var postQuery = new StringBuilder();
            postQuery.AppendLine(
                @"SELECT p.Id,
                         p.Title,
                         p.Content,
                         p.CreatedOn,
                         p.ModifiedOn,
                         u.UserName AS CreatorUserName,
                         p.ForumId,
                         f.Title    AS ForumTitle,
                         pm.Url     AS MediaUrl,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                postQuery.AppendLine(SqlQueriesHelper.IsCreator<Post>(SelectAlias, userId) + ",");
            }

            postQuery.AppendLine(SqlQueriesHelper.SumCommentsCount(SelectAlias) + ",");
            postQuery.AppendLine(SqlQueriesHelper.SumVotesScore<Post, PostVote>(SelectAlias));

            postQuery.AppendLine(
                @$"FROM   Posts AS p
                         INNER JOIN AspNetUsers AS u
                                 ON p.CreatorId = u.Id
                         INNER JOIN Forums AS f
                                 ON p.ForumId = f.Id
                          LEFT JOIN PostMedias AS pm
                                 ON p.Id = pm.PostId
                 WHERE   p.Id = {request.PostId}");

            var post = await _readDbConnection.QueryFirstOrDefaultAsync<GetPostByIdResponse>(postQuery.ToString());
            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (userId != null)
            {
                var postVoteQuery =
                    $@"SELECT pv.Id,
                              pv.Type
                       FROM   PostVotes AS pv
                       WHERE  pv.PostId = {post.Id}
                              AND pv.CreatorId = '{userId}'";

                var savedPostQuery =
                    $@"SELECT ups.PostId
                       FROM   UserPostSaves AS ups
                       WHERE  ups.PostId = {post.Id}
                              AND ups.UserId = '{userId}'";

                var postVote = await _readDbConnection.QueryFirstOrDefaultAsync<PostByIdPostVoteDto>(postVoteQuery.ToString());
                var savedPost = await _readDbConnection.QueryFirstOrDefaultAsync<int?>(savedPostQuery.ToString());

                post.IsSaved = savedPost != null;
                post.VoteId = postVote?.Id;
                post.VoteType = postVote?.Type;
            }

            return post;
        }
    }
}
//SELECT p.Id,
//       p.Title                   p.Content,
//       p.CreatedOn,
//       p.ModifiedOn,
//       u.UserName                AS CreatorUserName,
//       p.ForumId,
//       f.Title                   AS ForumTitle,
//       pm.Url                    AS MediaUrl,
//       Cast(CASE
//              WHEN c.CreatorId = {userId} THEN 1
//              ELSE 0
//            END AS BIT)          AS IsCreator,
//       (SELECT Count(*)
//        FROM   Comments AS c
//        WHERE  p.Id = c.PostId)  AS CommentsCount,
//       (SELECT Sum(Cast(pv.Type AS int))
//        FROM   PostVotes AS pv
//        WHERE  p.Id = pv.PostId) AS VotesScore
//FROM   Posts AS p
//       INNER JOIN AspNetUsers AS u
//               ON p.CreatorId = u.Id
//       INNER JOIN Forums AS f
//               ON p.ForumId = f.Id
//       LEFT JOIN PostMedias AS pm
//              ON p.Id = pm.PostId
//WHERE  p.Id = {postId} 

//SELECT pv.Id,
//       pv.Type
//FROM   PostVotes AS pv
//WHERE  pv.PostId = {postId}
//       AND p.CreatorId = {userId} 

//SELECT ups.Id,
//FROM   UserPostSaves AS ups
//WHERE  ups.PostId = {post.Id}
//       AND ups.CreatorId = {userId}