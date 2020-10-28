using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserPostVotes.Commands.DeleteUserPostVote
{
    public class DeleteUserPostVoteCommandHandler : IRequestHandler<DeleteUserPostVoteCommand>
    {
        private readonly IRepository<UserPostVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeleteUserPostVoteCommandHandler(IRepository<UserPostVote> votesRepository, IAuthenticatedUserService authUserService)
        {
            _votesRepository = votesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeleteUserPostVoteCommand request, CancellationToken cancellationToken)
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

            _votesRepository.Delete(vote);
            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}