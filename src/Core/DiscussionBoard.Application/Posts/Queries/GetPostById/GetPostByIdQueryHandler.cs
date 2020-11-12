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
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<UserPostSave> _savesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetPostByIdQueryHandler(
            IRepository<Post> postsRepository,
            IRepository<PostVote> postVotesRepository,
            IRepository<UserPostSave> savesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _postVotesRepository = postVotesRepository;
            _savesRepository = savesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetPostByIdResponse> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var response = await _postsRepository
                .AllAsNoTracking()
                .Where(p => p.Id == request.PostId)
                .ProjectTo<GetPostByIdResponse>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            if (response == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                var postVote = await _postVotesRepository
                    .AllAsNoTracking()
                    .SingleOrDefaultAsync(pv => pv.PostId == request.PostId && pv.CreatorId == userId);

                if (postVote != null)
                {
                    response.VoteId = postVote.Id;
                    response.VoteType = postVote.Type.ToString().ToLower();
                }

                var save = await _savesRepository
                    .AllAsNoTracking()
                    .SingleOrDefaultAsync(s => s.PostId == request.PostId && s.UserId == userId);

                if (save != null)
                {
                    response.IsSaved = true;
                }
            }

            return response;
        }
    }
}
