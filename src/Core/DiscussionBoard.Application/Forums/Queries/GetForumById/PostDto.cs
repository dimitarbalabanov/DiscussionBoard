namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class PostDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        //public string CreatorId { get; set; }
        //public virtual ApplicationUser Creator { get; set; }

        public int CommentsCount { get; set; }
    }
}
