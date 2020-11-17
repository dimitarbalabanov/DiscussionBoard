using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class RuleDto : IMapTo<Rule>
    {
        public RuleDto(string title, string description)
        {
            Title = title;
            Description = description;
        }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
