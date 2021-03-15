using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Application.Common.Commands
{
    public static class SqlCommandBuilder
    {
        private const string ForumSelectAlias = "f";
        private const string PostsSelectAlias = "p";
        private const string PostsInnerSelectAlias = "pp";
        private const int PageSize = 10;

        public static string BuildForumQuery(string userId, int forumId)
        {
            var forumQuery = new StringBuilder();
            forumQuery.AppendLine(
                @"SELECT f.Id,
                         f.Title,
                         f.Subtitle,
                         f.Description,
                         u.UserName AS CreatorUserName,
                         fm.Url     AS MediaUrl,");

            if (userId != null)
            {
                forumQuery.AppendLine(SqlQueriesHelper.IsCreator<Forum>(ForumSelectAlias, userId) + ",");
            }

            forumQuery.AppendLine(
                $@"     (SELECT Count(*)
                         FROM   Posts AS p
                         WHERE  f.Id = p.forumId) AS PostsCount
                 FROM   Forums AS f
                        INNER JOIN AspNetUsers AS u
                                ON f.CreatorId = u.Id
                        LEFT JOIN ForumMedias AS fm
                               ON f.Id = fm.ForumId
                 WHERE  f.Id = {forumId}");

            return forumQuery.ToString();
        }

        public static string BuildPostsQuery(string userId, Order order, int? forumId, string cursor, string top)
        {
            var postsQuery = new StringBuilder();
            postsQuery.AppendLine(
                @"SELECT p.Id,
                         p.Title,
                         p.Content,
                         p.CreatedOn,
                         p.ModifiedOn,
                         u.UserName AS CreatorUserName,
                         f.Title    AS ForumTitle,
                         p.ForumId,
                         pm.Url     AS MediaUrl,");

            postsQuery.AppendLine(SqlQueriesHelper.SumCommentsCount(PostsSelectAlias) + ",");

            if (userId != null)
            {
                postsQuery.AppendLine(SqlQueriesHelper.IsCreator<Post>(PostsSelectAlias, userId) + ",");
            }

            postsQuery.AppendLine(order == Order.Top ? $"{PostsSelectAlias}.VotesScore" : SqlQueriesHelper.SumVotesScore<Post, PostVote>(PostsSelectAlias));

            postsQuery.AppendLine(
                $@"FROM   (SELECT TOP({PageSize}) pp.Id,
                                                  pp.Title,
                                                  pp.Content,
                                                  pp.CreatedOn,
                                                  pp.ModifiedOn,
                                                  pp.ForumId,
                                                  pp.CreatorId");
            if (order == Order.Top)
            {
                postsQuery.Append(",");
                postsQuery.AppendLine(SqlQueriesHelper.SumVotesScore<Post, PostVote>(PostsInnerSelectAlias));
            }

            postsQuery.AppendLine(
                @"        FROM   Posts AS pp");

            if (forumId != null)
            {
                postsQuery.AppendLine($"WHERE ( pp.ForumId = {(int)forumId} )");
            }

            //FilterAndOrder.ToSql(cursor, top, postsQuery, order, PostsInnerSelectAlias, forumId == null);

            postsQuery.AppendLine(
                @") AS p
                         INNER JOIN AspNetUsers AS u
                                 ON p.CreatorId = u.Id
                         INNER JOIN Forums AS f
                                 ON p.ForumId = f.Id
                          LEFT JOIN PostMedias AS pm
                                 ON p.Id = pm.PostId ");
            return null;
        }
    }
}
