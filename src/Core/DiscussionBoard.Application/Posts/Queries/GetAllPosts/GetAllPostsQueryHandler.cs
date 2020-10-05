using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, GetAllPostsVm>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IMapper _mapper;

        public GetAllPostsQueryHandler(IRepository<Post> postsRepository, IMapper mapper)
        {
            _postsRepository = postsRepository;
            _mapper = mapper;
        }

        public async Task<GetAllPostsVm> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var posts = await _postsRepository
                .AllAsNoTracking()
                .ProjectTo<GetAllPostsPostDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(p => p.CreatedOn)
                .Take(10)
                .ToListAsync();

            var vm = new GetAllPostsVm { Posts = posts };

            return vm;
        }
    }
}
