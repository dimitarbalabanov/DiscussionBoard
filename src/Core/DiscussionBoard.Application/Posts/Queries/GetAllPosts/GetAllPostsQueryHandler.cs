using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Common.Responses;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PagedResponse<GetAllPostsResponse>>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<UserPostVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;
        private const int PageSize = 10;

        public GetAllPostsQueryHandler(
            IRepository<Post> postsRepository,
            IRepository<UserPostVote> votesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _votesRepository = votesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<PagedResponse<GetAllPostsResponse>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var query = _postsRepository
                .AllAsNoTracking();

            if (request.ForumId != null)
            {
                query = query.Where(p => p.ForumId == request.ForumId);
            }

            query = query.Take(PageSize);

            var posts = await query.ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                var postIds = posts
                    .Select(c => c.Id)
                    .ToList();

                var currentUserVotesInPosts = await _votesRepository
                    .AllAsNoTracking()
                    .Where(v => postIds.Contains(v.PostId) && v.CreatorId == userId)
                    .ToListAsync();

                foreach (var post in posts)
                {
                    var postVote = currentUserVotesInPosts.SingleOrDefault(v => v.PostId == post.Id);
                    if (postVote != null)
                    {
                        post.CurrentUserVoteType = postVote.Type.ToString().ToLower();
                    }
                }
            }

            var response = new PagedResponse<GetAllPostsResponse>
            {
                Data = new GetAllPostsResponse { Posts = posts }
            };

            return response;
        }
    }
}