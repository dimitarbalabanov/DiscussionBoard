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
            postQuery.AppendLine("SELECT p.Id,");
            postQuery.AppendLine("       p.Title,");
            postQuery.AppendLine("       p.Content,");
            postQuery.AppendLine("       p.CreatedOn,");
            postQuery.AppendLine("       p.ModifiedOn,");
            postQuery.AppendLine("       u.UserName                AS CreatorUserName,");
            postQuery.AppendLine("       p.ForumId,");
            postQuery.AppendLine("       f.Title                   AS ForumTitle,");
            postQuery.AppendLine("       pm.Url                    AS MediaUrl,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                postQuery.AppendLine("       Cast(CASE");
                postQuery.AppendLine($"              WHEN p.CreatorId = {userId} THEN 1");
                postQuery.AppendLine("              ELSE 0");
                postQuery.AppendLine("            END AS BIT)             AS IsCreator,");
            }

            postQuery.AppendLine("       (SELECT Count(*)");
            postQuery.AppendLine("        FROM   Comments AS c");
            postQuery.AppendLine("        WHERE  p.Id = c.PostId)  AS CommentsCount,");
            postQuery.AppendLine("       (SELECT Sum(Cast(pv.Type AS int))");
            postQuery.AppendLine("        FROM   PostVotes AS pv");
            postQuery.AppendLine("        WHERE  p.Id = pv.PostId) AS VotesScore");
            postQuery.AppendLine("FROM   Posts AS p");
            postQuery.AppendLine("       INNER JOIN AspNetUsers AS u");
            postQuery.AppendLine("               ON p.CreatorId = u.Id");
            postQuery.AppendLine("       INNER JOIN Forums AS f");
            postQuery.AppendLine("               ON p.ForumId = f.Id");
            postQuery.AppendLine("       LEFT JOIN PostMedias AS pm");
            postQuery.AppendLine("              ON p.Id = pm.PostId");
            postQuery.AppendLine($"WHERE  p.Id = {request.PostId}");

            var post = await _readDbConnection.QueryFirstOrDefaultAsync<GetPostByIdResponse>(postQuery.ToString());
            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (userId != null)
            {
                var postVoteQuery = new StringBuilder();
                postVoteQuery.AppendLine("SELECT pv.Id,");
                postVoteQuery.AppendLine("       pv.Type");
                postVoteQuery.AppendLine("FROM   PostVotes AS pv");
                postVoteQuery.AppendLine($"WHERE  pv.PostId = {post.Id}");
                postVoteQuery.AppendLine($"       AND p.CreatorId = {userId}");

                var savedPostQuery = new StringBuilder();
                savedPostQuery.AppendLine("SELECT ups.Id,");
                savedPostQuery.AppendLine("FROM   UserPostSaves AS ups");
                savedPostQuery.AppendLine($"WHERE  ups.PostId = {post.Id}");
                savedPostQuery.AppendLine($"       AND ups.CreatorId = {userId}");

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