using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, GetAllCommentsVm>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<Vote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetAllCommentsQueryHandler(
            IRepository<Comment> commentsRepository,
            IRepository<Vote> votesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _commentsRepository = commentsRepository;
            _votesRepository = votesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetAllCommentsVm> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
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
                        comment.CurrentUserHasVoted = true;
                        comment.CurrentUserVoteType = commentVote.Type.ToString().ToLower();
                    }
                }
            }

            var vm = new GetAllCommentsVm { Comments = comments };

            return vm;
        }
    }
}
