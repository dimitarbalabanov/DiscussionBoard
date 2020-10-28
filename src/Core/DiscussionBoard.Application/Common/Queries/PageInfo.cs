namespace DiscussionBoard.Application.Common.Queries
{
    public class PageInfo
    {
        public static PageInfo SinglePage() => new PageInfo { PageIndex = 0, PageSize = -1 };

        public int PageIndex { get; set; }

        public int PageSize { get; set; } = 20;

        public bool IsSinglePage() => this.PageIndex == 0 && this.PageSize == -1;
    }
}
