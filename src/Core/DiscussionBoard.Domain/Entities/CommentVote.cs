using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class CommentVote : BaseVote
    {
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; }
    }
}
