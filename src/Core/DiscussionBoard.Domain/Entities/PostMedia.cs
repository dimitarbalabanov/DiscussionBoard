namespace DiscussionBoard.Domain.Entities
{
    public class PostMedia : Media
    {
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
