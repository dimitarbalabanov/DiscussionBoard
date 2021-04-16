using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentVotes.Commands.DeleteCommentVote
{
    public class DeleteCommentVoteCommandHandler : IRequestHandler<DeleteCommentVoteCommand>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IIdentityService _identityService;

        public DeleteCommentVoteCommandHandler(
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService authUserService,
            IIdentityService identityService, IRepository<Comment> commentsRepository)
        {
            _commentVotesRepository = commentVotesRepository ?? throw new System.ArgumentNullException(nameof(commentVotesRepository));
            _authUserService = authUserService ?? throw new System.ArgumentNullException(nameof(authUserService));
            _identityService = identityService ?? throw new System.ArgumentNullException(nameof(identityService));
            _commentsRepository = commentsRepository ?? throw new System.ArgumentNullException(nameof(commentsRepository));
        }

        public async Task<Unit> Handle(DeleteCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var commentVote = await _commentVotesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            if (commentVote == null)
            {
                throw new NotFoundException(nameof(CommentVote));
            }

            if (!await AuthorizationAccessHelper.HasPermissionToAccessAsync(_authUserService.UserId, commentVote.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            _commentVotesRepository.Delete(commentVote);
            await _commentVotesRepository.SaveChangesAsync();

            var comment = await _commentsRepository
                .All()
                .SingleOrDefaultAsync(p => p.Id == commentVote.CommentId);

            switch (commentVote.Type)
            {
                case VoteType.Down:
                    comment.VotesScore++;
                    break;
                case VoteType.Up:
                    comment.VotesScore--;
                    break;
                default:
                    break;
            }

            _commentsRepository.Update(comment);
            await _commentsRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
