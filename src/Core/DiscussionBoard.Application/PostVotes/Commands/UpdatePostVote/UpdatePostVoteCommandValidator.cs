using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.PostVotes.Commands.UpdatePostVote
{
    public class UpdatePostVoteCommandValidator : AbstractValidator<UpdatePostVoteCommand>
    {
        public UpdatePostVoteCommandValidator()
        {
            RuleFor(p => p.Type)
                .IsValidVoteTypeEnum();

            RuleFor(p => p.Id)
               .NotEmpty();
        }
    }
}
