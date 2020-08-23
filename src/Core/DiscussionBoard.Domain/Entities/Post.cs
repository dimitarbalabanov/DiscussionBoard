using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatorId { get; set; }
        public virtual ApplicationUser Creator { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public virtual IEnumerable<Comment> Comments { get; set; }
    }
}
