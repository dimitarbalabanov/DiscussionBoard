namespace DiscussionBoard.Application.Posts.Commands
{
    public static class ValidatorConstants
    {
        public const int TitleMinLength = 3, TitleMaxLength = 200;
        public const int ContentMinLength = 30, ContentMaxLength = 2500;
        public const string ErrorMsg = " must be between {0} and {1} characters long.";
    }
}
