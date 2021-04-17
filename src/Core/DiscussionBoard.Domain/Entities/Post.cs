using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Post : BaseModel<int>, IVotesScore, ICreator
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Votes = new HashSet<PostVote>();
            Reports = new HashSet<PostReport>();
            UserSaves = new HashSet<UserPostSave>();
        }

        public string Title { get; set; }

        public string Content { get; set; }

        public int VotesScore { get; set; }

        public int CommentsCount { get; set; }

        public string CreatorId { get; set; }
        public virtual User Creator { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public virtual PostMedia Media { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<PostVote> Votes { get; set; }

        public virtual ICollection<PostReport> Reports { get; set; }

        public virtual ICollection<UserPostSave> UserSaves { get; set; }
    }
}
