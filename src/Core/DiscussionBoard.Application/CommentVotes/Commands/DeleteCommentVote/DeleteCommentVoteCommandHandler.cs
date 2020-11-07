using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentVotes.Commands.DeleteCommentVote
{
    public class DeleteCommentVoteCommandHandler : IRequestHandler<DeleteCommentVoteCommand>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeleteCommentVoteCommandHandler(IRepository<CommentVote> commentVotesRepository, IAuthenticatedUserService authUserService)
        {
            _commentVotesRepository = commentVotesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeleteCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var vote = await _commentVotesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.CommentVoteId);

            if (vote == null)
            {
                throw new NotFoundException(nameof(CommentVote));
            }

            if (vote.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _commentVotesRepository.Delete(vote);
            await _commentVotesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
