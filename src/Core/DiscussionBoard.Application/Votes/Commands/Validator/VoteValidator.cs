using DiscussionBoard.Domain.Entities.Enums;
using FluentValidation;
using System;

namespace DiscussionBoard.Application.Votes.Commands.Validator
{
    public static class VoteValidator
    {
        private const string ErrorMsg = "Invalid vote type";

        public static IRuleBuilderOptions<T, string> IsValidEnumType<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .Must(type => Enum.TryParse(type, true, out VoteType result) && Enum.IsDefined(typeof(VoteType), result))
                .WithMessage(ErrorMsg);
        }
    }
}
