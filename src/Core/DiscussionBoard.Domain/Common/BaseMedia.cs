namespace DiscussionBoard.Domain.Common
{
    public abstract class BaseMedia : BaseModel<int>
    {
        public string Url { get; set; }

        public string PublicId { get; set; }
    }
}
