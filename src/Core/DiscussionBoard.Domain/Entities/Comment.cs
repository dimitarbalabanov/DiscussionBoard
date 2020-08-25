using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Comment : BaseModel<int>
    {
        public Comment()
        {
            Votes = new HashSet<Vote>();
        }

        public string Content { get; set; }

        public string CreatorId { get; set; }
        public virtual ApplicationUser Creator { get; set; }

        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }
    }
}
