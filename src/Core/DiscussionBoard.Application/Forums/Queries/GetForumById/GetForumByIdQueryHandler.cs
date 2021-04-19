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
        private readonly IAuthenticatedUserService _userService;

        public GetForumByIdQueryHandler(IApplicationReadDbConnection readDbConnection, IAuthenticatedUserService userService)
        {
            _readDbConnection = readDbConnection;
            _userService = userService;
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

            var userId = _userService.UserId;
            if (userId != null)
            {
                forumQuery.AppendLine(
                    $@"Cast(CASE
                             WHEN c.CreatorId = {userId} THEN 1
                             ELSE 0
                            END AS BIT)  AS IsCreator");
            }

            forumQuery.AppendLine(
                $@"FROM   Forums AS f
                          INNER JOIN AspNetUsers AS u
                                ON f.CreatorId = u.Id
                           LEFT JOIN ForumMedias AS fm
                                ON f.Id = fm.ForumId
                   WHERE  f.Id = {request.Id}");


            var forum = await _readDbConnection
                .QueryFirstOrDefaultAsync<GetForumByIdResponse>(forumQuery.ToString());

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
