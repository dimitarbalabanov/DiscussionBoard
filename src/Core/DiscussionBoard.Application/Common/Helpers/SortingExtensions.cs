using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Domain.Common;
using System;
using System.Linq;
using System.Text;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class SortingExtensions
    {
        public static IQueryable<T> Sort<T>(this IQueryable<T> collection, string sortBy, string sortType, string cursor)
            where T : BaseModel<int>, IAuditInfo, IVotesScore
        {
            Enum.TryParse(sortBy, true, out SortBy sort);
            switch (sort)
            {
                case SortBy.Top:
                    Enum.TryParse(sortType, true, out TopSortType topType);
                    if (topType != TopSortType.All)
                    {
                        var time = topType.ToDateTime();
                        collection = collection.Where(x => x.CreatedOn >= time);
                    }

                    if (cursor != null)
                    {
                        ApplyTopCursor(collection, cursor);
                    }

                    collection = collection.OrderByDescending(x => x.VotesScore);
                    break;
                case SortBy.Creation:
                default:
                    Enum.TryParse(sortType, true, out CreationSortType creationType);
                    if (cursor != null)
                    {
                        ApplyCreationCursor(collection, creationType, cursor);
                    }

                    switch (creationType)
                    {
                        case CreationSortType.Old:
                            collection = collection
                                .OrderBy(p => p.CreatedOn)
                                .ThenBy(p => p.Id);
                            break;
                        case CreationSortType.New:
                        default:
                            collection = collection
                                .OrderByDescending(p => p.CreatedOn)
                                .ThenBy(p => p.Id);
                            break;
                    }

                    break;
            }

            return collection;
        }

        private static void ApplyTopCursor<T>(IQueryable<T> collection, string cursor)
            where T : BaseModel<int>, IAuditInfo, IVotesScore
        {
            var topCursor = DecodeTopCursor(cursor);
            if (topCursor != null)
            {
                collection = collection
                    .Where(p => p.VotesScore > topCursor.VotesScore
                            || (p.VotesScore == topCursor.VotesScore && p.CreatedOn > topCursor.CreatedOn)
                            || (p.VotesScore == topCursor.VotesScore && p.CreatedOn == topCursor.CreatedOn && p.Id > topCursor.Id));
            }
        }

        private static void ApplyCreationCursor<T>(IQueryable<T> collection, CreationSortType type, string cursor)
            where T : BaseModel<int>, IAuditInfo
        {
            var sortCursor = DecodeSortCursor(cursor);
            if (sortCursor != null)
            {
                collection = type == CreationSortType.Old
                    ? collection
                        .Where(p => p.CreatedOn < sortCursor.CreatedOn
                           || (p.CreatedOn == sortCursor.CreatedOn && p.Id > sortCursor.Id))
                    : collection = collection
                        .Where(p => p.CreatedOn > sortCursor.CreatedOn
                           || (p.CreatedOn == sortCursor.CreatedOn && p.Id > sortCursor.Id));
            }
        }

        private static CreationCursor DecodeSortCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            try
            {
                var id = int.Parse(split[0]);
                var createdOn = DateTime.Parse(split[1]);
                return new CreationCursor { Id = id, CreatedOn = createdOn };
            }
            catch (Exception)
            {
                return null;
            }
        }

        private static TopCursor DecodeTopCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            try
            {
                var id = int.Parse(split[0]);
                var createdOn = DateTime.Parse(split[1]);
                var votesScore = int.Parse(split[2]);
                return new TopCursor { Id = id, CreatedOn = createdOn, VotesScore = votesScore };
            }
            catch (Exception)
            {
                return null;
            }
        }

        private static DateTime ToDateTime(this TopSortType type)
        {
            DateTime time = DateTime.UtcNow;
            switch (type)
            {
                case TopSortType.Today:
                    time = time.Date;
                    break;
                case TopSortType.Week:
                    var diff = time.DayOfWeek - DayOfWeek.Monday;
                    diff = diff < 0 ? diff += 7 : diff;
                    time = time.AddDays(-diff).Date;
                    break;
                case TopSortType.Month:
                    time = new DateTime(time.Year, time.Month, 1);
                    break;
                case TopSortType.All:
                default:
                    time = DateTime.UnixEpoch;
                    break;
            }

            return time;
        }

    }
}
