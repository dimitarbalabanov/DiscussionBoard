using FluentValidation;

namespace DiscussionBoard.Application.Comments.Commands.Validator
{
    public static class CommentValidator
    {
        public const int ContentMinLength = 10;
        public const int ContentMaxLength = 2000;
        public const string ErrorMsg = "Content must be between {0} and {1} characters long.";

        public static IRuleBuilderOptions<T, string> IsContentProperLength<T>(this IRuleBuilder<T, string> rule)
        {
            return rule
                .NotEmpty()
                .Length(ContentMinLength, ContentMaxLength)
                .WithMessage(string.Format(ErrorMsg, ContentMinLength, ContentMaxLength));
        }
    }
}
