namespace DiscussionBoard.Domain.Entities
{
    public class CommentVote : Vote
    {
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; }
    }
}
