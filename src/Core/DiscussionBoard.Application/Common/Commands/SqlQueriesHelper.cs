using DiscussionBoard.Domain.Common;

namespace DiscussionBoard.Application.Common.Commands
{
    public static class SqlQueriesHelper
    {
        public static string IsCreator<T>(string alias, string userId)
            where T : IHaveCreator
        {
            return 
                $@"Cast(CASE
                          WHEN {alias}.CreatorId = '{userId}' THEN 1
                          ELSE 0
                    END AS BIT) AS IsCreator";
        }

        public static string SumVotesScore<T,Y>(string alias)
            where T : IHaveVotes<Y>
            where Y : BaseVote
        {
            return
                $@"(SELECT Sum(Cast(v.Type AS INT))
                    FROM {typeof(Y).Name}s AS v
                    WHERE  {alias}.Id = v.{typeof(T).Name}Id) AS VotesScore";

        }

        public static string SumCommentsCount(string alias)
        {
            return 
                $@"(SELECT Count(*)
                    FROM   Comments AS c
                    WHERE  {alias}.Id = c.PostId) AS CommentsCount";
        }
    }
}
