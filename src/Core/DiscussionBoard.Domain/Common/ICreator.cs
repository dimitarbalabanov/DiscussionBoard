using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Domain.Common
{
    public interface ICreator
    {
        string CreatorId { get; set; }

        User Creator { get; set; }
    }
}
