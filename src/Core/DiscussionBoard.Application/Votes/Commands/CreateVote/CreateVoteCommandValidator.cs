using DiscussionBoard.Application.Votes.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Votes.Commands.CreateVote
{
    public class CreateVoteCommandValidator : AbstractValidator<CreateVoteCommand>
    {
        public CreateVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .IsValidEnumType();

            RuleFor(v => v.CommentId)
                .NotEmpty();
        }
    }
}
