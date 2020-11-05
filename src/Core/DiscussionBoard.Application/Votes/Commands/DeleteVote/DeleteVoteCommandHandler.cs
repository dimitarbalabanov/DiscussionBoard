using DiscussionBoard.Application.Common.Exceptions;
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
        private readonly IAuthenticatedUserService _authUserService;

        public DeleteVoteCommandHandler(IRepository<Vote> votesRepository, IAuthenticatedUserService authUserService)
        {
            _votesRepository = votesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeleteVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            if (vote == null)
            {
                throw new NotFoundException(nameof(Vote));
            }

            if (vote.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _votesRepository.Delete(vote);
            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
