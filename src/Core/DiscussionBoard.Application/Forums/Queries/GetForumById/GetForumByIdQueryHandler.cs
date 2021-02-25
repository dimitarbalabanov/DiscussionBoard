using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQueryHandler : IRequestHandler<GetForumByIdQuery, GetForumByIdResponse>
    {
        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;

        public GetForumByIdQueryHandler(IApplicationReadDbConnection readDbConnection, IAuthenticatedUserService authUserService)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
        }

        public async Task<GetForumByIdResponse> Handle(GetForumByIdQuery request, CancellationToken cancellationToken)
        {
            var forumQuery = new StringBuilder();
            forumQuery.AppendLine("SELECT f.Id,");
            forumQuery.AppendLine("       f.Title,");
            forumQuery.AppendLine("       f.Subtitle,");
            forumQuery.AppendLine("       f.Description,");
            forumQuery.AppendLine("       u.UserName                AS CreatorUserName,");
            forumQuery.AppendLine("       fm.Url                    AS MediaUrl,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                forumQuery.AppendLine("       Cast(CASE");
                forumQuery.AppendLine($"              WHEN f.CreatorId = {userId} THEN 1");
                forumQuery.AppendLine("              ELSE 0");
                forumQuery.AppendLine("            END AS BIT)          AS IsCreator,");
            }

            forumQuery.AppendLine("       (SELECT Count(*)");
            forumQuery.AppendLine("        FROM   Posts AS p");
            forumQuery.AppendLine("        WHERE  f.Id = p.ForumId) AS PostsCount");
            forumQuery.AppendLine("FROM   Forums AS f");
            forumQuery.AppendLine("       INNER JOIN AspNetUsers AS u");
            forumQuery.AppendLine("               ON f.CreatorId = u.Id");
            forumQuery.AppendLine("       LEFT JOIN ForumMedias AS fm");
            forumQuery.AppendLine("              ON f.Id = fm.ForumId");
            forumQuery.AppendLine($"WHERE  f.Id = {request.Id}");

            var forum = await _readDbConnection.QueryFirstOrDefaultAsync<GetForumByIdResponse>(forumQuery.ToString());
            if (forum == null)
            {
                throw new NotFoundException(nameof(Forum));
            }

            return forum;
        }
    }
}
            //var forumQuery = $@"SELECT TOP(1)
            //                               (
            //                                   SELECT     Count(*)
            //                                   FROM       Posts    AS p
            //                                   INNER JOIN Comments AS c
            //                                   ON         p.Id = c.PostId
            //                                   WHERE      f.Id = p.ForumId) AS CommentsCount,
            //                               u.UserName                       AS CreatorUserName,
            //                               f.Description,
            //                               f.Id,
            //                               fm.Url AS MediaUrl,
            //                               (
            //                                   SELECT Count(*)
            //                                   FROM   Posts AS p0
            //                                   WHERE  f.Id = p0.forumId)    AS PostsCount,
            //                               f.Subtitle,
            //                               f.Title
            //                    FROM       Forums      AS f
            //                    INNER JOIN AspNetUsers AS u
            //                    ON         f.CreatorId = u.Id
            //                    LEFT JOIN  ForumMedias AS fm
            //                    ON         f.Id = fm.ForumId
            //                    WHERE      f.Id = {request.Id}";


