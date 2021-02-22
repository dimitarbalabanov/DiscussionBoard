using DiscussionBoard.Application.Common.Helpers.Enums;

namespace DiscussionBoard.Application.Common.Helpers
{
    public class SortParameters
    {
        public Order Sorter { get; set; }

        public Interval TopSorter { get; set; }
    }
}
