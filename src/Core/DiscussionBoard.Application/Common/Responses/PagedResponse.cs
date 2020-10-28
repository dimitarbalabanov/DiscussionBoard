namespace DiscussionBoard.Application.Common.Responses
{
    public class PagedResponse<T>
    {
        public T Data { get; set; }

        public string Cursor { get; set; }
    }   
}
