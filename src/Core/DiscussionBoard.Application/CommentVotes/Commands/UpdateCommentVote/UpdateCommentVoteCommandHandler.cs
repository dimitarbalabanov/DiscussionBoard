using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentVotes.Commands.UpdateCommentVote
{
    public class UpdateCommentVoteCommandHandler : IRequestHandler<UpdateCommentVoteCommand>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;

        public UpdateCommentVoteCommandHandler(
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

        public async Task<Unit> Handle(UpdateCommentVoteCommand request, CancellationToken cancellationToken)
        {
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

            commentVote.Type = Enum.Parse<VoteType>(request.Type, true);
            await _commentVotesRepository.SaveChangesAsync();

            var comment = await _commentsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == commentVote.CommentId);

            comment.VotesScore -= (int)commentVote.Type * 2;
            _commentsRepository.Update(comment);
            await _commentVotesRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
