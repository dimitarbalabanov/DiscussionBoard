using DiscussionBoard.Domain.Entities.Enums;
using FluentValidation;
using System;

namespace DiscussionBoard.Application.Common.CustomValidators
{
    public static class ReportTypeEnumValidator
    {
        private const string ErrorMsg = "Invalid report type";

        public static IRuleBuilderOptions<T, string> IsValidReportTypeEnum<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .Must(type => Enum.TryParse(type, true, out ReportType result) && Enum.IsDefined(typeof(ReportType), result))
                .WithMessage(ErrorMsg);
        }
    }
}
