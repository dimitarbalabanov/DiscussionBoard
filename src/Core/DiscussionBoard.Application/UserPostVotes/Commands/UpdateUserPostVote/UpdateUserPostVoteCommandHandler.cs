using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserPostVotes.Commands.UpdateUserPostVote
{
    public class UpdateUserPostVoteCommandHandler : IRequestHandler<UpdateUserPostVoteCommand>
    {
        private readonly IRepository<UserPostVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public UpdateUserPostVoteCommandHandler(IRepository<UserPostVote> votesRepository, IAuthenticatedUserService authUserService)
        {
            _votesRepository = votesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(UpdateUserPostVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.PostId == request.PostId && v.CreatorId == _authUserService.UserId);

            if (vote == null)
            {
                throw new NotFoundException(nameof(UserPostVote));
            }

            if (vote.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            vote.Type = Enum.Parse<VoteType>(request.Type, true);
            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
