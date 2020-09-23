namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class PostDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string CreatorUserName { get; set; }

        public string CreatorAvatarUrl { get; set; }

        public int CommentsCount { get; set; }
    }
}
