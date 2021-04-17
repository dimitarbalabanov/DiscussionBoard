using AutoMapper;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.PostVotes.Commands.CreatePostVote
{
    public class CreatePostVoteCommandHandler : IRequestHandler<CreatePostVoteCommand, CreatePostVoteCommandResponse>
    {
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreatePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper, IRepository<Post> postsRepository)
        {
            _postVotesRepository = postVotesRepository ?? throw new ArgumentNullException(nameof(postVotesRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
        }

        public async Task<CreatePostVoteCommandResponse> Handle(CreatePostVoteCommand request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var userId = _authUserService.UserId;
            var hasAlreadyVoted = await _postVotesRepository
                   .AllAsNoTracking()
                   .AnyAsync(pv => pv.PostId == request.PostId && pv.CreatorId == userId);

            if (hasAlreadyVoted)
            {
                throw new BadRequestException("User has already voted");
            }

            var post = await _postsRepository
                .All()
                .SingleOrDefaultAsync(p => p.Id == request.PostId);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var postVote = _mapper.Map<PostVote>(request);
            postVote.CreatorId = userId;
            await _postVotesRepository.AddAsync(postVote);
            await _postVotesRepository.SaveChangesAsync();

            switch (postVote.Type)
            {
                case VoteType.Down: 
                    post.VotesScore--;
                    break;
                case VoteType.Up:
                    post.VotesScore++;
                    break;
                default:
                    break;
            }

            _postsRepository.Update(post);
            await _postsRepository.SaveChangesAsync();

            return _mapper.Map<CreatePostVoteCommandResponse>(postVote);
        }
    }
}
