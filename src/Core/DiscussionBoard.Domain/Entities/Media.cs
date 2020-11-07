using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Domain.Entities
{
    public class Media : BaseModel<int>
    {
        public string Url { get; set; }

        public string PublicId { get; set; }
    }
}
