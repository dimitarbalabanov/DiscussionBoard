using DiscussionBoard.Domain.Common;
using System;

namespace DiscussionBoard.Domain.Entities
{
    public class PostVote : IAuditInfo
    {
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int VoteId { get; set; }
        public Vote Vote { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
