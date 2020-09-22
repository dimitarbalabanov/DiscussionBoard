namespace DiscussionBoard.Application.Comments.Commands
{
    public static class ValidatorConstants
    {
        public const int CONTENT_MIN_LENGTH = 10, CONTENT_MAX_LENGTH = 2000;
        public const string CONTENT_ERROR_MSG = "Content must be between {0} and {1} characters long.";
    }
}
