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
        private readonly IRepository<UserCommentVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetAllCommentsQueryHandler(
            IRepository<Comment> commentsRepository,
            IRepository<UserCommentVote> votesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _commentsRepository = commentsRepository;
            _votesRepository = votesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetAllCommentsResponse> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            var comments = await _commentsRepository
                .AllAsNoTracking()
                .Where(c => c.PostId == request.PostId)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            if (_authUserService.UserId != null)
            {
                var commentIds = comments
                    .Select(c => c.Id)
                    .ToList();

                var currentUserVotesInComments = await _votesRepository
                    .AllAsNoTracking()
                    .Where(v => commentIds.Contains(v.CommentId) && v.CreatorId == _authUserService.UserId)
                    .ToListAsync();

                foreach (var comment in comments)
                {
                    var commentVote = currentUserVotesInComments.SingleOrDefault(v => v.CommentId == comment.Id);
                    if (commentVote != null)
                    {
                        comment.CurrentUserVoteType = commentVote.Type.ToString().ToLower();
                    }
                }
            }

            var response = new GetAllCommentsResponse { Comments = comments };
            return response;
        }
    }
}
