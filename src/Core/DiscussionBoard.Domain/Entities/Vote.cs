using DiscussionBoard.Domain.Common;
using DiscussionBoard.Domain.Entities.Enums;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Vote : BaseModel<int>
    {
        public Vote()
        {
            CommentsVotes = new HashSet<CommentVote>();
            PostsVotes = new HashSet<PostVote>();
        }

        public VoteType Type { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public virtual ICollection<CommentVote> CommentsVotes { get; set; }

        public virtual ICollection<PostVote> PostsVotes { get; set; }
    }
}
