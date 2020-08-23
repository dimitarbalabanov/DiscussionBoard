using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Post : BaseModel<int>
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }

        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatorId { get; set; }
        public virtual ApplicationUser Creator { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public virtual IEnumerable<Comment> Comments { get; set; }
    }
}
