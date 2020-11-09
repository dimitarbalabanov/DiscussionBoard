using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandResponse : IMapFrom<Post>
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string MediaUrl { get; set; }
    }
}
