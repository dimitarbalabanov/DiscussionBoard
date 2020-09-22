using DiscussionBoard.Domain.Entities.Enums;
using FluentValidation;
using System;

namespace DiscussionBoard.Application.Votes.Commands.CreateVote
{
    public class CreateVoteCommandValidator : AbstractValidator<CreateVoteCommand>
    {
        private const string ERROR_MSG = "Invalid {PropertyName}";
        public CreateVoteCommandValidator()
        {
            RuleFor(v => v.Type)
                .Must(type => Enum.TryParse(type, true, out VoteType result) && Enum.IsDefined(typeof(VoteType), result))
                .WithMessage(ERROR_MSG);
        }
    }
}
