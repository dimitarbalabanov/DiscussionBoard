using FluentValidation;

namespace DiscussionBoard.Application.Forums.Commands.Validator
{
    public static class ForumValidator
    {
        public const int TitleMinLength = 3;
        public const int TitleMaxLength = 40;
        public const string TitleErrorMsg = "Title must be between {0} and {1} characters long.";

        public const int SubtitleMinLength = 10;
        public const int SubtitleMaxLength = 80;
        public const string SubtitleErrorMsg = "Subtitle must be between {0} and {1} characters long.";

        public const int DescriptionMinLength = 20;
        public const int DescriptionMaxLength = 800;
        public const string DescriptionErrorMsg = "Description must be between {0} and {1} characters long.";

        public static IRuleBuilderOptions<T, string> IsTitleProperLength<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Length(TitleMinLength, TitleMaxLength)
                .WithMessage(string.Format(TitleErrorMsg, TitleMinLength, TitleMaxLength));
        }

        public static IRuleBuilderOptions<T, string> IsSubtitleProperLength<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Length(SubtitleMinLength, SubtitleMaxLength)
                .WithMessage(string.Format(SubtitleErrorMsg, SubtitleMinLength, SubtitleMaxLength));
        }

        public static IRuleBuilderOptions<T, string> IsDescriptionProperLength<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Length(DescriptionMinLength, DescriptionMaxLength)
                .WithMessage(string.Format(DescriptionErrorMsg, DescriptionMinLength, DescriptionMaxLength));
        }
    }
}
