using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentVotes.Commands.DeleteCommentVote
{
    public class DeleteCommentVoteCommandHandler : IRequestHandler<DeleteCommentVoteCommand>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;

        public DeleteCommentVoteCommandHandler(
            IRepository<CommentVote> commentVotesRepository,
            IRepository<Comment> commentsRepository,
            IAuthenticatedUserService userService,
            IIdentityService identityService)
        {
            _commentVotesRepository = commentVotesRepository ?? throw new ArgumentNullException(nameof(commentVotesRepository));
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
        }

        public async Task<Unit> Handle(DeleteCommentVoteCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var commentVote = await _commentVotesRepository.All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            if (commentVote == null)
            {
                throw new NotFoundException(nameof(CommentVote));
            }

            if (!await AuthorizationAccess.HasPermissionAsync(_userService.UserId, commentVote.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            var commentType = commentVote.Type;
            _commentVotesRepository.Delete(commentVote);
            await _commentVotesRepository.SaveChangesAsync();

            var comment = await _commentsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == commentVote.CommentId);

            comment.VotesScore -= (int)commentType;
            _commentsRepository.Update(comment);
            await _commentsRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
