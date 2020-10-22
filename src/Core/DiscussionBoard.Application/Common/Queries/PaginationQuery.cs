namespace DiscussionBoard.Application.Common.Queries
{
    public class PaginationQuery
    {
        public PaginationQuery()
        {
            PageNumber = 1;
        }

        public PaginationQuery(int pageNumber)
        {
            PageNumber = pageNumber;
        }

        public int PageNumber { get; set; }
    }
}
