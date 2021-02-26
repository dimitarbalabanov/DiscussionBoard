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
                default:
                    time = DateTime.UnixEpoch;
                    break;
            }

            return time.ToString(SqlDateTimeFormat);
        }

        public static string ToSqlOrderString(this Order enumOrder)
        {
            var order = string.Empty;
            switch (enumOrder)
            {
                case Order.Old:
                    order = "ASC";
                    break;
                case Order.New:
                case Order.Top:
                default:
                    order = "DESC";
                    break;
            }

            return order;
        }
    }
}
