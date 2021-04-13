using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, GetAllCommentsResponse>
    {
        private const int PageSize = 10;
        private const string SqlDateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff";

        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;
        public GetAllCommentsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IAuthenticatedUserService authUserService)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
        }

        public async Task<GetAllCommentsResponse> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;
            var query = string.Empty;
            Enum.TryParse(request.Sort, true, out Sort sort);
            if (sort != Sort.Top)
            {
                var ord = sort == Sort.New ? "DESC" : "ASC";
                query =
                   $@"SELECT c.Id,
                               c.Content,
                               c.CreatedOn,
                               c.ModifiedOn,
                               u.UserName                   AS CreatorUserName,
                               Cast(CASE
                                      WHEN c.CreatorId = '{userId}' THEN 1
                                      ELSE 0
                                    END AS BIT)             AS IsCreator,
                               (SELECT Sum(Cast(cv.Type AS INT))
                                FROM   CommentVotes AS cv
                                WHERE  c.Id = cv.CommentId) AS VotesScore
                        FROM   (SELECT TOP({PageSize}) cc.Id,
                                               cc.Content,
                                               cc.CreatedOn,
                                               cc.ModifiedOn,
                                               cc.CreatorId,
                                               cc.PostId
                                FROM   Comments AS cc
                                WHERE  ( cc.PostId = {request.PostId} )";
                if (request.Cursor != null)
                {
                    var cursor = CursorPagingExtensions.DecodeSortCursor(request.Cursor);
                    query = query +
                                   $@" AND ( cc.CreatedOn < '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                                              OR ( cc.CreatedOn = '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                                                    AND cc.Id > {cursor.Item1} ) )";
                }

                query = query +
                          $@" ORDER  BY cc.CreatedOn DESC,
                                          cc.Id ASC) AS c
                               INNER JOIN AspNetUsers AS u
                                       ON c.CreatorId = u.Id ";
            }
            else
            {
                Enum.TryParse(request.Top, true, out Interval top);
                query =
                         $@"SELECT c.Id,
                                   c.Content,
                                   c.CreatedOn,
                                   c.ModifiedOn,
                                   u.UserName       AS CreatorUserName,
                                   Cast(CASE
                                           WHEN c.CreatorId = '{userId}' THEN 1
                                           ELSE 0
                                       END AS BIT) AS IsCreator,
                                   c.VotesScore
                           FROM   (SELECT TOP({PageSize}) cc.Id,
                                                   cc.Content,
                                                   cc.CreatedOn,
                                                   cc.ModifiedOn,
                                                   cc.CreatorId,
                                                   cc.PostId,
                                                   (SELECT Sum(Cast(cv.Type AS INT))
                                                   FROM   CommentVotes AS cv
                                                   WHERE  cc.Id = cv.CommentId) AS VotesScore
                                   FROM   Comments AS cc
                                   WHERE  ( cc.PostId = 1 )
                                           AND ( cc.CreatedOn > '{top.ToDateTimeString()}' )) AS c
                                   INNER JOIN AspNetUsers AS u
                                           ON c.CreatorId = u.Id";
                if (request.Cursor != null)
                {
                    var cursor = CursorPagingExtensions.DecodeTopCursor(request.Cursor);
                    query = query +
                        $@" WHERE  c.VotesScore > {cursor.Item3}
                              OR ( c.VotesScore = {cursor.Item3}
                                   AND c.CreatedOn > '{cursor.Item2.ToString(SqlDateTimeFormat)}' )
                              OR ( c.VotesScore = {cursor.Item3}
                                   AND c.CreatedOn = '{cursor.Item2.ToString(SqlDateTimeFormat)}'
                                   AND c.Id > {cursor.Item1} )";
                }
                query = query +
                        $@" ORDER  BY c.VotesScore DESC,
                                        c.CreatedOn ASC,
                                        c.Id ASC ";
            }


            var comments = await _readDbConnection.QueryAsync<CommentDto>(query.ToString());

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

            if (dict != null)
            {
                comments = dict.Values.ToList();
            }

            var response =  new GetAllCommentsResponse { Comments = comments };
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
//              WHEN c.CreatorId = { userId}
//THEN 1
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
//               AND(ic.Id > { cursor})
//        ORDER BY ic.CreatedOn {ASC/DESC}) AS c
//       INNER JOIN AspNetUsers AS u
//               ON c.CreatorId = u.Id

//SELECT c.Id,
//       c.Content,
//       c.CreatedOn,
//       c.ModifiedOn,
//       u.UserName AS CreatorUserName,
//       Cast(CASE
//              WHEN c.CreatorId = { userId}
//THEN 1
//              ELSE 0
//            END AS BIT) AS IsCreator,
//       c.VotesScore
//FROM   (SELECT TOP(10) cc.Id,
//                       cc.Content,
//                       cc.CreatedOn,
//                       cc.ModifiedOn,
//                       cc.CreatorId,
//                       cc.PostId,
//                       (SELECT Sum(Cast(cv.Type AS INT))
//                        FROM CommentVotes AS cv
//                        WHERE  cc.Id = cv.CommentId) AS VotesScore
//        FROM   Comments AS cc
//        WHERE  ( cc.PostId = 1 )
//               AND(cc.Id > { cursor})
//               AND(cc.CreatedOn >= { datetime})
//        ORDER BY VotesScore) AS c
//       INNER JOIN AspNetUsers AS u
//               ON c.CreatorId = u.Id

//SELECT c.Id,
//       c.CommentId
//       c.Type
//FROM   CommentVotes AS c
//WHERE  c.CommentId IN ( { commentIds} )
//       AND(c.CreatorId = { userId} ) 