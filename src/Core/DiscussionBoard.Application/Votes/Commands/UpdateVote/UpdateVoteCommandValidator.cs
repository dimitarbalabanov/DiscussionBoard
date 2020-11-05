using DiscussionBoard.Application.Votes.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Votes.Commands.UpdateVote
{
    public class UpdateVoteCommandValidator : AbstractValidator<UpdateVoteCommand>
    {
        public UpdateVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .IsValidVoteTypeEnum();
        }
    }
}
