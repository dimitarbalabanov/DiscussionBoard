using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Domain.Common;
using System;
using System.Linq;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class ScoreSortingExtension
    {
        public static IQueryable<T> ScoreSort<T>(this IQueryable<T> collection, TopSorter sorter)
            where T : IAuditInfo
        {
            var now = DateTime.UtcNow;

            switch (sorter)
            {
                case TopSorter.Today:
                    collection = collection.Where(x => x.CreatedOn >= now.Date);
                    break;
                case TopSorter.ThisWeek:
                    var diff = now.DayOfWeek - DayOfWeek.Monday;
                    diff = diff < 0 ? diff += 7 : diff;
                    collection = collection.Where(x => x.CreatedOn >= now.AddDays(-diff).Date);
                    break;
                case TopSorter.ThisMonth:
                    collection = collection.Where(x => x.CreatedOn >= new DateTime(now.Year, now.Month, 1));
                    break;
                case TopSorter.AllTime:
                    break;
                default:
                    break;
            }

            //collection = collection.OrderByDescending(x => x.Votes.Sum(v => (int)v.Type));

            return collection;
        } 
    }
}
