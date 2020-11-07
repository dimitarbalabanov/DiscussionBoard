namespace DiscussionBoard.Domain.Entities
{
    public class ForumMedia : Media
    {
        public int ForumId { get; set; }
        public Forum Forum { get; set; }
    }
}
