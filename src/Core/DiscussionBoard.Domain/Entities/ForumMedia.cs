using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class ForumMedia : BaseMedia
    {
        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }
    }
}
