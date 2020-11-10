using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Forum : BaseModel<int>
    {
        public Forum()
        {
            Rules = new HashSet<Rule>();
            Posts = new HashSet<Post>();
        }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }

        public string CreatorId { get; set; }
        public virtual User Creator { get; set; }

        public int ForumMediaId { get; set; }
        public virtual ForumMedia ForumMedia { get; set; }

        public virtual ICollection<Rule> Rules { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
