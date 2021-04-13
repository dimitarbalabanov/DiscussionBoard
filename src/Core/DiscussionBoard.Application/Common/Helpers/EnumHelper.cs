using DiscussionBoard.Application.Common.Helpers.Enums;
using System;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class EnumHelper
    {
        private const string SqlDateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff";

        public static string ToDateTimeString(this Interval interval)
        {
            DateTime time = DateTime.UtcNow;
            switch (interval)
            {
                case Interval.Today:
                    time = time.Date;
                    break;
                case Interval.ThisWeek:
                    var diff = time.DayOfWeek - DayOfWeek.Monday;
                    diff = diff < 0 ? diff += 7 : diff;
                    time = time.AddDays(-diff).Date;
                    break;
                case Interval.ThisMonth:
                    time = new DateTime(time.Year, time.Month, 1);
                    break;
                case Interval.AllTime:
                    time = DateTime.UnixEpoch;
                    break;
                default:
                    time = DateTime.UnixEpoch;
                    break;
            }

            return time.ToString(SqlDateTimeFormat);
        }

        public static string ToSqlSortString(this Sort enumSort)
        {
            var order = string.Empty;
            switch (enumSort)
            {
                case Sort.Old:
                    order = "ASC";
                    break;
                case Sort.New:
                case Sort.Top:
                default:
                    order = "DESC";
                    break;
            }

            return order;
        }
    }
}
