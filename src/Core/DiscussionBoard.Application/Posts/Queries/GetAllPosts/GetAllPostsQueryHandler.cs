using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Common.Responses;
using DiscussionBoard.Domain.Entities;
using FluentValidation.Validators;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PagedResponse<GetAllPostsVm>>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IMapper _mapper;
        private const int PageSize = 10;

        public GetAllPostsQueryHandler(IRepository<Post> postsRepository, IMapper mapper)
        {
            _postsRepository = postsRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<GetAllPostsVm>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var query = _postsRepository
                .AllAsNoTracking();
            int total = query.Count();
            if (request.ForumId != null)
            {
                query = query.Where(p => p.ForumId == request.ForumId);
            }

            if (request.Cursor != null)
            {
                var (id, createdOn) = DecodeCursor(request.Cursor);

                query = query.Where(p => p.CreatedOn <= createdOn && (p.Id == id || p.CreatedOn <= createdOn));
            }

            query = query.OrderByDescending(p => p.CreatedOn)
                .ThenByDescending(p => p.Id);

            // sorting, if present, here...

            query = query.Take(PageSize);

            var posts = await query.ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var response = new PagedResponse<GetAllPostsVm>
            {
                Data = new GetAllPostsVm { Posts = posts },
                Cursor = "",
                TotalCount = total,
                CurrentCount = posts.Count
            };

            if (posts.Count > 0)
            {
                var lastPost = posts[posts.Count - 1];
                var cursor = EncodeCursor(lastPost.Id, lastPost.CreatedOn);
                response.Cursor = cursor;
            }

            return response;
        }

        private (int, DateTime) DecodeCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            var createdOn = DateTime.Parse(split[0]);
            var id = int.Parse(split[1]);
            return (id, createdOn);
        }

        private string EncodeCursor(int id, DateTime createdOn)
        {
            var cursorStr = createdOn.ToString() + '#' + id;
            var encodedCursor = Convert.ToBase64String(Encoding.UTF8.GetBytes(cursorStr));
            return encodedCursor;
        }
    }
}