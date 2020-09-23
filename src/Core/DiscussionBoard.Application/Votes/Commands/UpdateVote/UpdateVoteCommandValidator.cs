using DiscussionBoard.Domain.Entities.Enums;
using FluentValidation;
using System;

namespace DiscussionBoard.Application.Votes.Commands.UpdateVote
{
    public class UpdateVoteCommandValidator : AbstractValidator<UpdateVoteCommand>
    {
        private const string ErrorMsg = "Invalid {PropertyName}";

        public UpdateVoteCommandValidator()
        {
            RuleFor(v => v.Id)
                .NotEmpty();

            RuleFor(v => v.CreatorId)
                .NotEmpty();

            RuleFor(v => v.Type)
                .Must(type => Enum.TryParse(type, true, out VoteType result) && Enum.IsDefined(typeof(VoteType), result))
                .WithMessage(ErrorMsg);
        }
    }
}