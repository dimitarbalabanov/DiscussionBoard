using DiscussionBoard.Application.Common.Helpers;

namespace DiscussionBoard.Application.Common.Responses
{
    public class PagedResponse<T>
        where T : ICanBePaged
    {
        public T Data { get; set; }

        public int? Cursor { get; set; }
    }   
}
