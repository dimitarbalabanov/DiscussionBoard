using System;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsPostDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string CreatorUserName { get; set; }

        public string CreatorAvatarUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int ForumId { get; set; }

        public string ForumTitle { get; set; }

        public int CommentsCount { get; set; }
    }
}
