using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.UpdateUserCommentVote
{
    public class UpdateUserCommentVoteCommandValidator : AbstractValidator<UpdateUserCommentVoteCommand>
    {
        public UpdateUserCommentVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .IsValidEnumType();
        }
    }
}
