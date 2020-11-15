using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class RuleDto : IMapFrom<Rule>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
