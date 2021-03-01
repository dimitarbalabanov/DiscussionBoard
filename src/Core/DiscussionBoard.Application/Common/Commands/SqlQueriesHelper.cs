using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Application.Common.Commands
{
    public static class SqlQueriesHelper
    {
        private const string IsCreatorSql =
            @"Cast(CASE
                     WHEN {0}.CreatorId = {1} THEN 1
                     ELSE 0
                    END AS BIT) AS IsCreator";

        private const string SumVotesScoreSql =
            @"(SELECT Sum(Cast(v.Type AS INT))
               FROM {0}Votes AS v
               WHERE  {1}.Id = v.{0}Id) AS VotesScore";

        private const string SumCommentsCountSql =
            @"(SELECT Count(*)
               FROM   Comments AS c
               WHERE  {0}.Id = c.PostId) AS CommentsCount";

        public static string IsCreator<T>(string alias, string userId)
            where T : IHaveCreator
        {
            return 
                $@"Cast(CASE
                          WHEN {alias}.CreatorId = '{userId}' THEN 1
                          ELSE 0
                    END AS BIT) AS IsCreator";
            //return string.Format(IsCreatorSql, alias, userId);
        }

        public static string SumVotesScore<T,Y>(string alias)
            where T : IHaveVotes<Y>
            where Y : BaseVote
        {
            return
                $@"(SELECT Sum(Cast(v.Type AS INT))
                    FROM {typeof(Y).Name}s AS v
                    WHERE  {alias}.Id = v.{typeof(T).Name}Id) AS VotesScore";

            //return string.Format(SumVotesScoreSql, nameof(T), alias);
        }

        public static string SumCommentsCount(string alias)
        {
            return 
                $@"(SELECT Count(*)
                    FROM   Comments AS c
                    WHERE  {alias}.Id = c.PostId) AS CommentsCount";
            //return string.Format(SumCommentsCountSql, alias);
        }
    }
}
