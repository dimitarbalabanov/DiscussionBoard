using DiscussionBoard.Application.Common.Queries;
using System.Collections.Generic;
using System.Linq;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class PagingExtensions
    {
        public static Paged<T> Page<T>(this IEnumerable<T> collection, PageInfo paging)
        {
            paging = paging ?? new PageInfo();

            IEnumerable<T> items = paging.IsSinglePage()
                ? collection
                : collection.Skip(paging.PageIndex * paging.PageSize).Take(paging.PageSize);

            return new Paged<T> { Items = items.ToArray(), Paging = paging };
        }

        public static Paged<T> Page<T>(this IQueryable<T> collection, PageInfo paging)
        {
            paging = paging ?? new PageInfo();

            IQueryable<T> items = paging.IsSinglePage()
                ? collection
                : collection.Skip(paging.PageIndex * paging.PageSize).Take(paging.PageSize);

            return new Paged<T> { Items = items.ToArray(), Paging = paging };
        }
    }
}