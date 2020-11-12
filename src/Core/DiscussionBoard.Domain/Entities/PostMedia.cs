using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class PostMedia : BaseMedia
    {
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}
