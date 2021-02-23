using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, GetAllCommentsResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetAllCommentsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IRepository<Comment> commentsRepository,
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _readDbConnection = readDbConnection;
            _commentsRepository = commentsRepository;
            _commentVotesRepository = commentVotesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetAllCommentsResponse> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            var commentsQuery = $@"SELECT c0.Content,
                                          c0.CreatedOn,
                                          a.UserName                   AS CreatorUserName,
                                          c0.Id,
                                          c0.ModifiedOn,
                                          (SELECT Sum(Cast(c.Type AS int))
                                           FROM   CommentVotes AS c
                                           WHERE  c0.Id = c.CommentId) AS VotesScore
                                    FROM  Comments AS c0
                                          INNER JOIN AspNetUsers AS a
                                                  ON c0.CreatorId = a.Id
                                    WHERE c0.PostId = 2";

            var order = Enum.Parse<Order>(request.Sort, true);
            switch (order)
            {
                case Order.New:
                     commentsQuery += $@"ORDER BY po.CreatedOn ASC";
                    break;
                case Order.Old:
                    commentsQuery += $@"ORDER BY po.CreatedOn DESC";
                    break;
                case Order.Top:
                    if (Enum.TryParse(request.Top, out Interval interval))
                    {
                        if (interval != Interval.AllTime)
                        {
                            var time = DateTime.UtcNow;
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
                                    var month = new DateTime(time.Year, time.Month, 1);
                                    break;
                                default:
                                    time = DateTime.UnixEpoch;
                                    break;
                            }

                            commentsQuery += $@"AND (po.CreatedOn >= {time:yyyy-MM-dd HH:mm:ss.fff})";
                        }

                        commentsQuery += $@"ORDER BY VotesScore DESC";
                    }
                    break;
                default:
                    break;
            }

            var comments = await _readDbConnection.QueryAsync<CommentDto>(commentsQuery);

            var sadsad = await _commentsRepository
                .AllAsNoTracking()
                .Include(c => c.Votes)
                .Where(c => c.PostId == request.PostId)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            //var userId = _authUserService.UserId;
            //if (userId != null)
            //{
            //    var commentIds = comments
            //        .Select(c => c.Id)
            //        .ToList();

            //    var currentUserVotesInComments = await _commentVotesRepository
            //        .AllAsNoTracking()
            //        .Where(cv => commentIds.Contains(cv.CommentId) && cv.CreatorId == userId)
            //        .ToListAsync();

            //    if (currentUserVotesInComments.Count > 0)
            //    {
            //        foreach (var comment in comments)
            //        {
            //            var commentVote = currentUserVotesInComments.SingleOrDefault(cv => cv.CommentId == comment.Id);
            //            if (commentVote != null)
            //            {
            //                comment.CurrentUserVoteId = commentVote.Id;
            //                comment.CurrentUserVoteType = commentVote.Type.ToString().ToLower();
            //            }
            //        }
            //    }
            //}

            var response = new GetAllCommentsResponse { Comments = comments };
            return response;
        }
    }
}
