using DiscussionBoard.Application.Common.Commands;
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
        private const string SelectAlias = "f";
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
            forumQuery.AppendLine(
                @"SELECT f.Id,
                         f.Title,
                         f.Subtitle,
                         f.Description,
                         u.UserName AS CreatorUserName,
                         fm.Url     AS MediaUrl,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                forumQuery.AppendLine(SqlQueriesHelper.IsCreator<Forum>(SelectAlias, userId) + ",");
            }

            forumQuery.AppendLine(
                $@"     (SELECT Count(*)
                         FROM   Posts AS p
                         WHERE  f.Id = p.forumId) AS PostsCount
                 FROM   Forums AS f
                        INNER JOIN AspNetUsers AS u
                                ON f.CreatorId = u.Id
                        LEFT JOIN ForumMedias AS fm
                               ON f.Id = fm.ForumId
                 WHERE  f.Id = {request.Id}");

            var forum = await _readDbConnection.QueryFirstOrDefaultAsync<GetForumByIdResponse>(forumQuery.ToString());
            if (forum == null)
            {
                throw new NotFoundException(nameof(Forum));
            }

            return forum;
        }
    }
}
//SELECT     f.Id,
//           f.Title,
//           f.Subtitle,
//           f.Description,
//           u.UserName AS CreatorUserName,
//           fm.Url     AS MediaUrl
//           (
//                  SELECT COUNT(*)
//                  FROM   Posts AS p
//                  WHERE  f.Id = p.forumId) AS PostsCount,
//           f.Subtitle,
//           f.Title
//FROM       Forums      AS f
//INNER JOIN AspNetUsers AS u
//ON         f.CreatorId = u.Id
//LEFT JOIN  ForumMedias AS fm
//ON         f.Id = fm.ForumId
//WHERE      f.Id = {request.Id}
