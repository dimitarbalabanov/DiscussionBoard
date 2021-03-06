﻿using DiscussionBoard.Domain.Entities.Enums;
using FluentValidation;
using System;

namespace DiscussionBoard.Application.Common.CustomValidators
{
    public static class VoteTypeEnumValidator
    {
        private const string ErrorMsg = "Invalid vote type";

        public static IRuleBuilderOptions<T, string> IsValidVoteTypeEnum<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Must(type => Enum.TryParse(type, true, out VoteType result) && Enum.IsDefined(typeof(VoteType), result))
                .WithMessage(ErrorMsg);
        }
    }
}
