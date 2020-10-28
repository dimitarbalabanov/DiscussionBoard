using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.UserPostVotes.Commands.CreateUserPostVote
{
    public class CreateUserPostVoteCommandValidator : AbstractValidator<CreateUserPostVoteCommand>
    {
        public CreateUserPostVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .IsValidEnumType();

            RuleFor(v => v.PostId)
                .NotEmpty();
        }
    }
}
