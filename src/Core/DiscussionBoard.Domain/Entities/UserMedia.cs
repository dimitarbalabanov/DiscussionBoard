using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class UserMedia : BaseMedia
    {
        public string UserId { get; set; }

        public User User { get; set; }
    }
}
