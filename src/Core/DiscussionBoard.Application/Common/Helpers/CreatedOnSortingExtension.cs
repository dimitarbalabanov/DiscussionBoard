using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Domain.Common;
using System.Linq;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class CreatedOnSortingExtension
    {
        public static IQueryable<T> CreationTimeSort<T>(this IQueryable<T> collection, SortInfo sort)
            where T : IAuditInfo
        {
            switch (sort.Sorter)
            {
                case Sorter.New:
                    collection = collection.OrderByDescending(x => x.CreatedOn);
                    break;
                case Sorter.Old:
                    collection = collection.OrderBy(x => x.CreatedOn);
                    break;
                default:
                    break;
            }

            return collection;
        }
    }
}
