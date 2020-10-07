using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, GetPostByIdVm>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<Vote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetPostByIdQueryHandler(
            IRepository<Post> postsRepository,
            IRepository<Comment> commentsRepository,
            IRepository<Vote> votesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _commentsRepository = commentsRepository;
            _votesRepository = votesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetPostByIdVm> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _postsRepository
                .AllAsNoTracking()
                .Where(p => p.Id == request.Id)
                .ProjectTo<GetPostByIdVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            if (vm == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (_authUserService.UserId != null)
            {
                var commentIds = vm.Comments
                    .Select(c => c.Id)
                    .ToList();
                var currentUserVotesInComments = await _votesRepository
                    .AllAsNoTracking()
                    .Where(v => commentIds.Contains(v.CommentId) && v.CreatorId == _authUserService.UserId)
                    .ToListAsync();

                foreach (var comment in vm.Comments)
                {
                    var commentVote = currentUserVotesInComments.SingleOrDefault(v => v.CommentId == comment.Id);
                    if (commentVote != null)
                    {
                        comment.CurrentUserHasVoted = true;
                        comment.CurrentUserVoteType = commentVote.Type.ToString().ToLower();
                    }
                }
            }

            return vm;
        }
    }
}
