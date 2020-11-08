using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class PostReport : BaseReport
    { 
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
