using DiscussionBoard.Application.Comments.Queries.GetAllComments;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Helpers.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Application.Common.Commands
{
    public static class FilterAndSort
    {
        public static void ToSql(int? cursor, string top, StringBuilder query, Sort order, string alias, bool where)
        {
            var conditions = new List<string>();
            if (cursor != null)
            {
                conditions.Add($"{alias}.Id > {(int)cursor}");
            }

            string sqlSort;
            if (order == Sort.Top)
            {
                if (Enum.TryParse(top, out Interval interval))
                {
                    conditions.Add($"{alias}.CreatedOn >= '{interval.ToDateTimeString()}'");
                }

                sqlSort = $"VotesScore";
            }
            else
            {
                sqlSort = $"{alias}.CreatedOn {order.ToSqlSortString()}";
            }

            if (conditions.Count > 0)
            {
                query.AppendLine(where ? $"WHERE ( {conditions[0]} )" : $"AND ( {conditions[0]} )");
                for (int i = 1; i < conditions.Count; i++)
                {
                    query.AppendLine($"AND ( {conditions[i]} )");
                }
            }

            query.AppendLine($"ORDER BY " + sqlSort);
        }
    }
}
