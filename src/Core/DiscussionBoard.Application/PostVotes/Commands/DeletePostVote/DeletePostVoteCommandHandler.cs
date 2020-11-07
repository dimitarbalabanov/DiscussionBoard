using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.PostVotes.Commands.DeletePostVote
{
    public class DeletePostVoteCommandHandler : IRequestHandler<DeletePostVoteCommand>
    {
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeletePostVoteCommandHandler(IRepository<PostVote> postVotesRepository, IAuthenticatedUserService authUserService)
        {
            _postVotesRepository = postVotesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeletePostVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _postVotesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.PostVoteId);

            if (vote == null)
            {
                throw new NotFoundException(nameof(PostVote));
            }

            if (vote.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _postVotesRepository.Delete(vote);
            await _postVotesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
