using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;

namespace DiscussionBoard.Application.Forums.Commands.UpdateForum
{
    public class UpdateForumCommandResponse : IMapFrom<Forum>
    {
        public int Id { get; set; }

        public DateTime ModifiedOn { get; set; }

        public string MediaUrl { get; set; }
    }
}
