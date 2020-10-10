using System;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CreatorUserName { get; set; }

        public string CreatorAvatarUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int VotesScore { get; set; }

        public bool CurrentUserHasVoted { get; set; }

        public string CurrentUserVoteType { get; set; }
    }
}
