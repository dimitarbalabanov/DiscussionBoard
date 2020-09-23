using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, GetPostByIdVm>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IMapper _mapper;

        public GetPostByIdQueryHandler(IRepository<Post> postsRepository, IMapper mapper)
        {
            _postsRepository = postsRepository;
            _mapper = mapper;
        }

        public async Task<GetPostByIdVm> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _postsRepository
                .AllAsNoTracking()
                .Where(p => p.Id == request.Id)
                .ProjectTo<GetPostByIdVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
            if (vm == null)
            {
                throw new System.Exception("Not Found");
            }

            return vm;
        }
    }
}
