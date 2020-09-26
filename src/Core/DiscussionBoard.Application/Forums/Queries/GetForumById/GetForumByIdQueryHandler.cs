using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQueryHandler : IRequestHandler<GetForumByIdQuery, GetForumByIdVm>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IMapper _mapper;
        public GetForumByIdQueryHandler(IRepository<Forum> forumsRepository, IRepository<Post> postsRepository, IMapper mapper)
        {
            _forumsRepository = forumsRepository;
            _postsRepository = postsRepository;
            _mapper = mapper;
        }

        public async Task<GetForumByIdVm> Handle(GetForumByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _forumsRepository
                .AllAsNoTracking()
                .Where(f => f.Id == request.Id)
                .ProjectTo<GetForumByIdVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            var postsDto = await _postsRepository
                .AllAsNoTracking()
                .Where(p => p.ForumId == request.Id)
                .OrderByDescending(p => p.CreatedOn)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            vm.Posts = postsDto;
            vm.PostsCount = postsDto.Count;

            return vm;
        }
    }
}
