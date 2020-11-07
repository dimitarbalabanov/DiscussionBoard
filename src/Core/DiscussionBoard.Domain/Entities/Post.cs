using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Post : BaseModel<int>
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Votes = new HashSet<PostVote>();
            Reports = new HashSet<PostReport>();
            SavedBy = new HashSet<UserSavedPost>();
        }

        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatorId { get; set; }
        public virtual User Creator { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public int MediaId { get; set; }
        public virtual PostMedia Media { get; set; }

        public virtual IEnumerable<Comment> Comments { get; set; }

        public virtual IEnumerable<PostVote> Votes { get; set; }

        public virtual IEnumerable<PostReport> Reports { get; set; }

        public virtual IEnumerable<UserSavedPost> SavedBy { get; set; }
    }
}
