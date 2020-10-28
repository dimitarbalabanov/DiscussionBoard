using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.CreateUserCommentVote
{
    public class CreateUserCommentVoteCommandValidator : AbstractValidator<CreateUserCommentVoteCommand>
    {
        public CreateUserCommentVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .IsValidEnumType();

            RuleFor(v => v.CommentId)
                .NotEmpty();
        }
    }
}
