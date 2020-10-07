using FluentValidation;

namespace DiscussionBoard.Application.Posts.Commands.Validators
{
    public static class PostValidator
    {
        public const int TitleMinLength = 3;
        public const int TitleMaxLength = 200;
        public const string TitleErrorMsg = "Title must be between {0} and {1} characters long.";

        public const int ContentMinLength = 30;
        public const int ContentMaxLength = 2500;
        public const string ContentErrorMsg = "Content must be between {0} and {1} characters long.";

        public static IRuleBuilderOptions<T, string> IsTitleProperLength<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Length(TitleMinLength, TitleMaxLength)
                .WithMessage(string.Format(TitleErrorMsg, TitleMinLength, TitleMaxLength));
        }

        public static IRuleBuilderOptions<T, string> IsContentProperLength<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Length(ContentMinLength, ContentMaxLength)
                .WithMessage(string.Format(ContentErrorMsg, ContentMinLength, ContentMaxLength));
        }
    }
}
