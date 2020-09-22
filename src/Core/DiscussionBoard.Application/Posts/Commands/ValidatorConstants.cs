namespace DiscussionBoard.Application.Posts.Commands
{
    public static class ValidatorConstants
    {
        public const int TITLE_MIN_LENGTH = 3, TITLE_MAX_LENGTH = 200;
        public const int CONTENT_MIN_LENGTH = 30, CONTENT_MAX_LENGTH = 2500;
        public const string TITLE_ERROR_MSG = "Title must be between {0} and {1} characters long.";
        public const string CONTENT_ERROR_MSG = "Content must be between {0} and {1} characters long.";
    }
}
