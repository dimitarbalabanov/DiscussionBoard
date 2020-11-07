namespace DiscussionBoard.Domain.Entities
{
    public class CommentReport : Report
    {
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; }
    }
}
