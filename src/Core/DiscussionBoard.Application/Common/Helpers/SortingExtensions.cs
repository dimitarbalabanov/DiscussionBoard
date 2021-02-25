﻿using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Domain.Common;
using System;
using System.Linq;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class SortingExtensions
    {
        public static IQueryable<T> ScoreSort<T, Y>(this IQueryable<T> collection, Interval sorter)
            where T : IAuditInfo, IHaveVotes<Y> 
            where Y : BaseVote
        {
            var now = DateTime.UtcNow;
            switch (sorter)
            {
                case Interval.Today:
                    collection = collection.Where(x => x.CreatedOn >= now.Date);
                    break;
                case Interval.ThisWeek:
                    var diff = now.DayOfWeek - DayOfWeek.Monday;
                    diff = diff < 0 ? diff += 7 : diff;
                    collection = collection.Where(x => x.CreatedOn >= now.AddDays(-diff).Date);
                    break;
                case Interval.ThisMonth:
                    collection = collection.Where(x => x.CreatedOn >= new DateTime(now.Year, now.Month, 1));
                    break;
                default:
                    break;
            }

            collection = collection.OrderByDescending(x => x.Votes.Sum(v => (int)v.Type));
            return collection;
        }

        public static IQueryable<T> CreatedOnSort<T>(this IQueryable<T> collection, Order sorter)
            where T : IAuditInfo
        {
            switch (sorter)
            {
                case Order.New:
                    collection = collection.OrderByDescending(x => x.CreatedOn);
                    break;
                case Order.Old:
                    collection = collection.OrderBy(x => x.CreatedOn);
                    break;
                default:
                    break;
            }

            return collection;
        }
    }
}