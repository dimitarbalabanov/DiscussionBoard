using DiscussionBoard.Domain.Common;
using System;

namespace DiscussionBoard.Domain.Entities
{
    public class UserPostSave : IAuditInfo
    {
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }

        public int PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}
