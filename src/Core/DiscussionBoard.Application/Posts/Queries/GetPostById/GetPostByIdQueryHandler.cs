using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, GetPostByIdResponse>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<UserPostVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetPostByIdQueryHandler(
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

        public async Task<GetPostByIdResponse> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var response = await _postsRepository
                .AllAsNoTracking()
                .Where(p => p.Id == request.Id)
                .ProjectTo<GetPostByIdResponse>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            if (response == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var userId = _authUserService.UserId;

            if (userId != null)
            {
                var vote = await _votesRepository
                    .AllAsNoTracking()
                    .SingleOrDefaultAsync(v => v.PostId == response.Id && v.CreatorId == userId);

                if (vote != null)
                {
                    response.CurrentUserVoteType = vote.Type.ToString().ToLower();
                }
            }

            return response;
        }
    }
}
