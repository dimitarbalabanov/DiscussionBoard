namespace DiscussionBoard.Application.Common.Responses
{
    public class PagedResponse<T>
    {
        public T Data { get; set; }

        public int? Cursor { get; set; }
    }   
}
