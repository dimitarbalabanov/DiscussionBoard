using DiscussionBoard.Domain.Common;
using DiscussionBoard.Domain.Entities.Enums;
using System;

namespace DiscussionBoard.Domain.Entities
{
    public class UserCommentVote : IAuditInfo
    {
        public VoteType Type { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
