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
    public class CreatePostVoteCommandHandler : IRequestHandler<CreatePostVoteCommand, int>
    {
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public CreatePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository,
            IAuthenticatedUserService authUserService)
        {
            _postVotesRepository = postVotesRepository;
            _authUserService = authUserService;
        }

        public async Task<int> Handle(CreatePostVoteCommand request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;

            if (await _postVotesRepository
                   .AllAsNoTracking()
                   .AnyAsync(pv => pv.PostId == request.PostId && pv.CreatorId == userId))
            {
                throw new BadRequestException("Already voted");
            }

            var postVote = new PostVote
            {
                Type = Enum.Parse<VoteType>(request.Type, true),
                PostId = request.PostId,
                CreatorId = userId
            };

            await _postVotesRepository.AddAsync(postVote);
            await _postVotesRepository.SaveChangesAsync();

            return postVote.Id;
        }
    }
}
