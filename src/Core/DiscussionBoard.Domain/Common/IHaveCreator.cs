using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Domain.Common
{
    public interface IHaveCreator
    {
        string CreatorId { get; set; }

        User Creator { get; set; }
    }
}
