using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Forum
    {
        public Forum()
        {
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
