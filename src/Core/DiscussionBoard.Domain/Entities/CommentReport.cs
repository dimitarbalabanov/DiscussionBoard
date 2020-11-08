using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class CommentReport : BaseReport
    {
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; }
    }
}
