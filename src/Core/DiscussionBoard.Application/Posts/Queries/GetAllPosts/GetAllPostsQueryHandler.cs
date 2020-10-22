using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using FluentValidation.Validators;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, GetAllPostsVm>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IMapper _mapper;
        private const int PageSize = 5;

        public GetAllPostsQueryHandler(IRepository<Post> postsRepository, IMapper mapper)
        {
            _postsRepository = postsRepository;
            _mapper = mapper;
        }

        public async Task<GetAllPostsVm> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var query = _postsRepository
                .AllAsNoTracking();

            if (request.ForumId != null)
            {
                query = query.Where(p => p.ForumId == request.ForumId);
            }

            query = query.OrderByDescending(p => p.CreatedOn);

            var pageNumber = request.PageNumber != null ? (int)request.PageNumber : 1;
            var skip = (pageNumber - 1) * PageSize;
            query = query.Skip(skip).Take(PageSize);

            var posts = await query
                 .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                 .ToListAsync();

            var vm = new GetAllPostsVm { Posts = posts, NextPage = pageNumber + 1};

            return vm;
        }
    }
}