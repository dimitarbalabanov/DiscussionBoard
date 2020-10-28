using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.UserPostVotes.Commands.UpdateUserPostVote
{
    public class UpdateUserPostVoteCommandValidator : AbstractValidator<UpdateUserPostVoteCommand>
    {
        public UpdateUserPostVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .IsValidEnumType();
        }
    }
}
