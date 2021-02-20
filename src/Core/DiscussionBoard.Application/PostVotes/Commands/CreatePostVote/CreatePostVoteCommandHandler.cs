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
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreatePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postVotesRepository = postVotesRepository ?? throw new ArgumentNullException(nameof(postVotesRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreatePostVoteCommandResponse> Handle(CreatePostVoteCommand request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;
            var hasAlreadyVoted = await _postVotesRepository
                   .AllAsNoTracking()
                   .AnyAsync(pv => pv.PostId == request.PostId && pv.CreatorId == userId);

            if (hasAlreadyVoted)
            {
                throw new BadRequestException("User has already voted");
            }

            var postVote = _mapper.Map<PostVote>(request);
            postVote.CreatorId = userId;

            await _postVotesRepository.AddAsync(postVote);
            await _postVotesRepository.SaveChangesAsync();

            return _mapper.Map<CreatePostVoteCommandResponse>(postVote);
        }
    }
}
