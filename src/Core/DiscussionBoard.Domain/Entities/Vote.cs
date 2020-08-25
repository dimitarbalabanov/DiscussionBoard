using DiscussionBoard.Domain.Common;
using DiscussionBoard.Domain.Entities.Enums;

namespace DiscussionBoard.Domain.Entities
{
    public class Vote : BaseModel<int>
    {
        public VoteType Type { get; set; }

        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        public string CreatorId { get; set; }
        public ApplicationUser Creator { get; set; }
    }
}
