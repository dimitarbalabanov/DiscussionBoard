using DiscussionBoard.Domain.Common;
using DiscussionBoard.Domain.Entities.Enums;

namespace DiscussionBoard.Domain.Entities
{
    public class Vote : BaseModel<int>
    {
        public VoteType Type { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }
    }
}
