using System;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandResponse
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CreatorUserName { get; set; }

        public string CreatorAvatarUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int VotesScore { get; set; }
    }
}
