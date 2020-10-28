using DiscussionBoard.Domain.Common;
using DiscussionBoard.Domain.Entities.Enums;
using System;

namespace DiscussionBoard.Domain.Entities
{
    public class UserPostVote : IAuditInfo
    {
        public VoteType Type { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
