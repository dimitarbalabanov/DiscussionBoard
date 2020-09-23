namespace DiscussionBoard.Application.Comments.Commands
{
    public static class ValidatorConstants
    {
        public const int ContentMinLength = 10, ContentMaxLength = 2000;
        public const string ErrorMsg = "Content must be between {0} and {1} characters long.";
    }
}
