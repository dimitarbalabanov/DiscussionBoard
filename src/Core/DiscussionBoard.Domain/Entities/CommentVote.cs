using DiscussionBoard.Domain.Common;
using System;

namespace DiscussionBoard.Domain.Entities
{
    public class CommentVote : IAuditInfo
    {
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int VoteId { get; set; }
        public Vote Vote { get; set; }

        public int CommentId { get; set; }
        public Comment Comment { get; set; }
    }
}
