using FluentValidation;

namespace DiscussionBoard.Application.Votes.Commands.DeleteVote
{
    public class DeleteVoteCommandValidator : AbstractValidator<DeleteVoteCommand>
    {
        public DeleteVoteCommandValidator()
        {
            RuleFor(v => v.Id)
                .NotEmpty();

            RuleFor(v => v.CreatorId)
                .NotEmpty();
        }
    }
}
