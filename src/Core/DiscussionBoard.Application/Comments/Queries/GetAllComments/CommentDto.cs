using System;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string CreatorUserName { get; set; }

        public bool IsCreator { get; set; }

        public int VotesScore { get; set; }

        public int VoteId { get; set; }

        public string VoteType { get; set; }
    }
}
