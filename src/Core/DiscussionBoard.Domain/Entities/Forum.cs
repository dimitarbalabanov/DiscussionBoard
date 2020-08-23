using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Forum : BaseModel<int>
    {
        public Forum()
        {
            Posts = new HashSet<Post>();
        }

        public string Title { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
