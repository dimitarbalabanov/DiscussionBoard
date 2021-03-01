using DiscussionBoard.Application.Common.Commands;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Common.Responses;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, PagedResponse<GetAllCommentsResponse>>
    {
        private const int PageSize = 10;
        private const string SelectAlias = "c";
        private const string InnerSelectAlias = "cc";

        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;
        public GetAllCommentsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IAuthenticatedUserService authUserService)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
        }

        public async Task<PagedResponse<GetAllCommentsResponse>> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            var commentsQuery = new StringBuilder();
            commentsQuery.AppendLine(
                @"SELECT c.Id,
                         c.Content,
                         c.CreatedOn,
                         c.ModifiedOn,
                         u.UserName AS CreatorUserName,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                commentsQuery.AppendLine(SqlQueriesHelper.IsCreator<Comment>(SelectAlias, userId) + ",");
            }

            Enum.TryParse(request.Sort, true, out Order order);

            var sumVotesScoreSql = SqlQueriesHelper.SumVotesScore<Comment, CommentVote>(SelectAlias);
            commentsQuery.AppendLine(order == Order.Top ? $"{SelectAlias}.VotesScore" : sumVotesScoreSql);

            commentsQuery.AppendLine(
                $@"FROM   (SELECT TOP({PageSize}) cc.Id,
                                                  cc.Content,
                                                  cc.CreatedOn,
                                                  cc.ModifiedOn,
                                                  cc.CreatorId,
                                                  cc.PostId");

            if (order == Order.Top)
            {
                commentsQuery.AppendLine(sumVotesScoreSql);
            }

            commentsQuery.AppendLine(
                            @"FROM   Comments AS cc");
            commentsQuery.AppendLine(
                           $@"WHERE   ( cc.PostId = {request.PostId} )");

            FilterAndOrder.ToSql(request.Cursor, request.Top, commentsQuery, order, InnerSelectAlias, false);

            commentsQuery.AppendLine(
                @") AS c
                    INNER JOIN AspNetUsers AS u
                            ON c.CreatorId = u.Id");

            var comments = await _readDbConnection.QueryAsync<CommentDto>(commentsQuery.ToString());

            Dictionary<int, CommentDto> dict = null;
            if (userId != null && comments.Count > 0)
            {
                dict = comments.ToDictionary(x => x.Id, x => x);
                var commentIds = string.Join(", ", dict.Keys);

                var commentVotesQuery =
                    $@"SELECT c.Id,
                              c.CommentId,
                              c.Type
                       FROM   CommentVotes AS c
                       WHERE  c.CommentId IN ( {commentIds} )
                              AND (c.CreatorId = '{userId}')";

                var commentVotes = await _readDbConnection.QueryAsync<CommentVoteDto>(commentVotesQuery.ToString());

                if (commentVotes.Count > 0)
                {
                    foreach (var cv in commentVotes)
                    {
                        dict[cv.CommentId].VoteId = cv.Id;
                        dict[cv.CommentId].VoteType = cv.Type;
                    }
                }
            }

            comments = dict != null ? dict.Values.ToList() : comments;

            var response = new PagedResponse<GetAllCommentsResponse>
            {
                Data = new GetAllCommentsResponse { Comments = comments },
                Cursor = comments.Count > 0 ? comments[comments.Count - 1].Id : default(int?)
            };

            return response;
        }
    }
}
//SELECT c.Id,
//       c.Content,
//       c.CreatedOn,
//       c.ModifiedOn,
//       u.UserName AS CreatorUserName,
//       Cast(CASE
//              WHEN c.CreatorId = {userId} THEN 1
//              ELSE 0
//            END AS BIT)             AS IsCreator,
//       (SELECT Sum(Cast(cv.Type AS INT))
//        FROM   CommentVotes AS cv
//        WHERE  c.Id = cv.CommentId) AS VotesScore
//FROM   (SELECT TOP(10) ic.Id,
//                           ic.Content,
//                           ic.CreatedOn,
//                           ic.ModifiedOn,
//                           ic.CreatorId,
//                           ic.PostId
//        FROM   Comments AS ic
//        WHERE  ( ic.PostId = 2 )
//               AND(ic.Id > {cursor})
//        ORDER BY ic.CreatedOn {ASC/DESC}) AS c
//       INNER JOIN AspNetUsers AS u
//               ON c.CreatorId = u.Id

//SELECT c.Id,
//       c.Content,
//       c.CreatedOn,
//       c.ModifiedOn,
//       u.UserName AS CreatorUserName,
//       Cast(CASE
//              WHEN c.CreatorId = {userId} THEN 1
//              ELSE 0
//            END AS BIT) AS IsCreator,
//       c.VotesScore
//FROM   (SELECT TOP(10) ic.Id,
//                       ic.Content,
//                       ic.CreatedOn,
//                       ic.ModifiedOn,
//                       ic.CreatorId,
//                       ic.PostId,
//                       (SELECT Sum(Cast(cv.Type AS INT))
//                        FROM CommentVotes AS cv
//                        WHERE  ic.Id = cv.CommentId) AS VotesScore
//        FROM   Comments AS ic
//        WHERE  ( ic.PostId = 1 )
//               AND(ic.Id > {cursor})
//               AND(ic.CreatedOn >= {datetime})
//        ORDER BY VotesScore) AS c
//       INNER JOIN AspNetUsers AS u
//               ON c.CreatorId = u.Id

//SELECT c.Id,
//       c.CommentId
//       c.Type
//FROM   CommentVotes AS c
//WHERE  c.CommentId IN ( { commentIds} )
//       AND(c.CreatorId = { userId} ) 