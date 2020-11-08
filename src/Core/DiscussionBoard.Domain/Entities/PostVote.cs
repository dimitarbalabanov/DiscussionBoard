using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class PostVote : BaseVote
    {
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
