using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;

namespace DiscussionBoard.Domain.Common
{
    public abstract class BaseVote : BaseModel<int>
    {
        public VoteType Type { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }
    }
}
