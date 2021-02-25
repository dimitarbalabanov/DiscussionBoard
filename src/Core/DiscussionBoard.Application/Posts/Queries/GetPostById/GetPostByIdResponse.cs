using System;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string CreatorUserName { get; set; }

        public int ForumId { get; set; }

        public string ForumTitle { get; set; }

        public string MediaUrl { get; set; }

        public int CommentsCount { get; set; }

        public int VotesScore { get; set; }

        public bool IsCreator { get; set; }

        public bool IsSaved { get; set; }

        public int? VoteId { get; set; }

        public string VoteType { get; set; }
    }
}
