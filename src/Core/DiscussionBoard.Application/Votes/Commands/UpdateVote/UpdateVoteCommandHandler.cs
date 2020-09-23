using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Votes.Commands.UpdateVote
{
    public class UpdateVoteCommandHandler : IRequestHandler<UpdateVoteCommand>
    {
        private readonly IRepository<Vote> _votesRepository;

        public UpdateVoteCommandHandler(IRepository<Vote> votesRepository)
        {
            _votesRepository = votesRepository;
        }

        public async Task<Unit> Handle(UpdateVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            if (vote == null)
            {
                throw new Exception("Not Found");
            }

            if (vote.CreatorId != request.CreatorId)
            {
                throw new Exception("Unauthorized");
            }

            vote.Type = Enum.Parse<VoteType>(request.Type, true);

            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
