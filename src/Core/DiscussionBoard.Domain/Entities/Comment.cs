using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Comment : BaseModel<int>
    {
        public Comment()
        {
            Votes = new HashSet<UserCommentVote>();
        }

        public string Content { get; set; }

        public string CreatorId { get; set; }
        public virtual User Creator { get; set; }

        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public virtual ICollection<UserCommentVote> Votes { get; set; }
    }
}
