using System;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string CreatorUserName { get; set; }

        public string CreatorAvatarUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int CommentsCount { get; set; }
    }
}
