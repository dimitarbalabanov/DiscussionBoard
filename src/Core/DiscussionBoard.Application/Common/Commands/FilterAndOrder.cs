using DiscussionBoard.Application.Comments.Queries.GetAllComments;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Helpers.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Application.Common.Commands
{
    public static class FilterAndOrder
    {
        public static void ToSql(GetAllCommentsQuery request, StringBuilder query, Order order, string alias)
        {
            var conditions = new List<string>();
            if (request.Cursor != null)
            {
                conditions.Add($"{alias}.Id > {(int)request.Cursor}");
            }

            string sqlOrder;
            if (order == Order.Top)
            {
                if (Enum.TryParse(request.Top, out Interval interval))
                {
                    conditions.Add($"{alias}.CreatedOn >= {interval.ToDateTimeString()}");
                }

                sqlOrder = $"VotesScore";
            }
            else
            {
                sqlOrder = $"{alias}.CreatedOn {order.ToSqlOrderString()}";
            }

            if (conditions.Count > 0)
            {
                foreach (var condition in conditions)
                {
                    query.AppendLine($"AND ( {condition} )");
                }
            }

            query.AppendLine($"ORDER BY " + sqlOrder);
        }
    }
}
