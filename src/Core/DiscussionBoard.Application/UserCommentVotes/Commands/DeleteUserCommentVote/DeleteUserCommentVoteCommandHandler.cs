using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.DeleteUserCommentVote
{
    public class DeleteUserCommentVoteCommandHandler : IRequestHandler<DeleteUserCommentVoteCommand>
    {
        private readonly IRepository<UserCommentVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeleteUserCommentVoteCommandHandler(IRepository<UserCommentVote> votesRepository, IAuthenticatedUserService authUserService)
        {
            _votesRepository = votesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeleteUserCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.CommentId == request.CommentId && v.CreatorId == _authUserService.UserId);

            if (vote == null)
            {
                throw new NotFoundException(nameof(UserCommentVote));
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
