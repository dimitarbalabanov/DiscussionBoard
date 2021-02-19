using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.CommentVotes.Commands.UpdateCommentVote
{
    public class UpdateCommentVoteCommandValidator : AbstractValidator<UpdateCommentVoteCommand>
    {
        public UpdateCommentVoteCommandValidator()
        {
            RuleFor(p => p.Type)
                .IsValidVoteTypeEnum();
        }
    }
}
