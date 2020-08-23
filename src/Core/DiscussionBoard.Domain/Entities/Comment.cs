namespace DiscussionBoard.Domain.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CreatorId { get; set; }
        public virtual ApplicationUser Creator { get; set; }

        public int PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}
