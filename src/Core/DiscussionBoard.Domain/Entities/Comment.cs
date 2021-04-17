using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Comment : BaseModel<int>, IVotesScore, ICreator
    {
        public Comment()
        {
            Votes = new HashSet<CommentVote>();
            Reports = new HashSet<CommentReport>();
        }

        public string Content { get; set; }

        public int VotesScore { get; set; }

        public string CreatorId { get; set; }
        public virtual User Creator { get; set; }

        public int PostId { get; set; }
        public virtual Post Post { get; set; }


        public virtual ICollection<CommentVote> Votes { get; set; }

        public virtual ICollection<CommentReport> Reports { get; set; }
    }
}
