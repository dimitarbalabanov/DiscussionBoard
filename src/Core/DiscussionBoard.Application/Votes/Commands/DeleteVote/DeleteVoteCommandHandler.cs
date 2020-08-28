using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Votes.Commands.DeleteVote
{
    public class DeleteVoteCommandHandler : IRequestHandler<DeleteVoteCommand>
    {
        private readonly IRepository<Vote> _votesRepository;

        public DeleteVoteCommandHandler(IRepository<Vote> votesRepository)
        {
            _votesRepository = votesRepository;
        }

        public async Task<Unit> Handle(DeleteVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            _votesRepository.Delete(vote);
            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
