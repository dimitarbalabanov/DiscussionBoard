using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQueryHandler : IRequestHandler<GetForumByIdQuery, GetForumByIdResponse>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IMapper _mapper;
        public GetForumByIdQueryHandler(IRepository<Forum> forumsRepository, IMapper mapper)
        {
            _forumsRepository = forumsRepository ?? throw new ArgumentNullException(nameof(forumsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<GetForumByIdResponse> Handle(GetForumByIdQuery request, CancellationToken cancellationToken)
        {

            var forumQuery = $@"SELECT TOP(1)
                                           (
                                               SELECT     Count(*)
                                               FROM       Posts    AS p
                                               INNER JOIN Comments AS c
                                               ON         p.Id = c.PostId
                                               WHERE      f.Id = p.ForumId) AS CommentsCount,
                                           u.UserName                       AS CreatorUserName,
                                           f.Description,
                                           f.Id,
                                           fm.Url AS MediaUrl,
                                           (
                                               SELECT Count(*)
                                               FROM   Posts AS p0
                                               WHERE  f.Id = p0.forumId)    AS PostsCount,
                                           f.Subtitle,
                                           f.Title
                                FROM       Forums      AS f
                                INNER JOIN AspNetUsers AS u
                                ON         f.CreatorId = u.Id
                                LEFT JOIN  ForumMedias AS fm
                                ON         f.Id = fm.ForumId
                                WHERE      f.Id = {request.Id}";


            var result = await _forumsRepository
                .AllAsNoTracking()
                .Where(f => f.Id == request.Id)
                .ProjectTo<GetForumByIdResponse>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            return result;
        }
    }
}
