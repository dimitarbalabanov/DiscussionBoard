using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, GetAllCommentsResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetAllCommentsQueryHandler(
            IRepository<Comment> commentsRepository,
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _commentsRepository = commentsRepository;
            _commentVotesRepository = commentVotesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetAllCommentsResponse> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            var comments = await _commentsRepository
                .AllAsNoTracking()
                .Include(c => c.Votes)
                .ThenInclude(cv => cv.Vote)
                .Where(c => c.PostId == request.PostId)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                var commentIds = comments
                    .Select(c => c.Id)
                    .ToList();

                var currentUserVotesInComments = await _commentVotesRepository
                    .AllAsNoTracking()
                    .Include(cv => cv.Vote)
                    .Where(cv => commentIds.Contains(cv.CommentId) && cv.Vote.CreatorId == userId)
                    .ToListAsync();

                foreach (var comment in comments)
                {
                    var commentVote = currentUserVotesInComments.SingleOrDefault(cv => cv.CommentId == comment.Id);
                    if (commentVote != null)
                    {
                        comment.CurrentUserVoteId = commentVote.VoteId;
                        comment.CurrentUserVoteType = commentVote.Vote.Type.ToString().ToLower();
                    }
                }
            }

            var response = new GetAllCommentsResponse { Comments = comments };
            return response;
        }
    }
}
