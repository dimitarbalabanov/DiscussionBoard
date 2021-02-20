using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;

namespace DiscussionBoard.Application.Posts.Commands.UpdatePost
{
    public class UpdatePostCommandResponse : IMapFrom<Post>
    {
        public DateTime ModifiedOn { get; set; }

        public string MediaUrl { get; set; }
    }
}
