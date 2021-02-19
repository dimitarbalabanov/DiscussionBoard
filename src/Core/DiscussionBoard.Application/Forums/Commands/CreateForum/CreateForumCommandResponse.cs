using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommandResponse : IMapFrom<Forum>
    {
        public int Id { get; set; }

    }
}
