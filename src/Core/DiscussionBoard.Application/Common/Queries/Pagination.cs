namespace DiscussionBoard.Application.Common.Queries
{
    public class Pagination
    {
        public Pagination()
        {
            PageNumber = 1;
        }

        public Pagination(int pageNumber)
        {
            PageNumber = pageNumber;
        }

        public int PageNumber { get; set; }
    }
}
