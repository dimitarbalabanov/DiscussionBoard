using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Votes.Commands.CreateVote
{
    public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, int>
    {
        private readonly IRepository<Vote> _votesRepository;
        private readonly IRepository<CommentVote> _commentVoteRepository;
        private readonly IRepository<PostVote> _postVoteRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public CreateVoteCommandHandler(
            IRepository<Vote> votesRepository,
            IRepository<CommentVote> commentVoteRepository,
            IRepository<PostVote> postVoteRepository,
            IAuthenticatedUserService authUserService)
        {
            _votesRepository = votesRepository;
            _commentVoteRepository = commentVoteRepository;
            _postVoteRepository = postVoteRepository;
            _authUserService = authUserService;
        }

        public async Task<int> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;
            var voteId = 0;

            if (request.EntityType == "Post")
            {
                if (await CheckIfPostVoteExistsAsync(_postVoteRepository, request.EntityId))
                {
                    throw new Exception("Already voted");
                }

                voteId = await CreateVoteAsync(request.Type, userId);
                await CreatePostVoteAsync(request.EntityId, voteId);
            }
            else if (request.EntityType == "Comment")
            {
                if (await CheckIfCommentVoteExistsAsync(_commentVoteRepository, request.EntityId))
                {
                    throw new Exception("Already voted");
                }

                voteId = await CreateVoteAsync(request.Type, userId);
                await CreateCommentVoteAsync(request.EntityId, voteId);
            }

            return voteId;
        }

        private async Task<bool> CheckIfPostVoteExistsAsync(IRepository<PostVote> repository, int postId)
        {
            return await repository
                    .AllAsNoTracking()
                    .Include(x => x.Vote)
                    .AnyAsync(pv => pv.PostId == postId && pv.Vote.CreatorId == _authUserService.UserId);
        }

        private async Task<bool> CheckIfCommentVoteExistsAsync(IRepository<CommentVote> repository, int commentId)
        {
            return await repository
                    .AllAsNoTracking()
                    .Include(x => x.Vote)
                    .AnyAsync(pv => pv.CommentId == commentId && pv.Vote.CreatorId == _authUserService.UserId);
        }

        private async Task<int> CreateVoteAsync(string type, string creatorId)
        {
            var vote = new Vote
            {
                Type = Enum.Parse<VoteType>(type, true),
                CreatorId = creatorId
            };

            await _votesRepository.AddAsync(vote);
            await _votesRepository.SaveChangesAsync();

            return vote.Id;
        }

        private async Task CreatePostVoteAsync(int postId, int voteId)
        {
            var postVote = new PostVote
            {
                PostId = postId,
                VoteId = voteId
            };

            await _postVoteRepository.AddAsync(postVote);
            await _postVoteRepository.SaveChangesAsync();
        }

        private async Task CreateCommentVoteAsync(int commentId, int voteId)
        {
            var commentVote = new CommentVote
            {
                CommentId = commentId,
                VoteId = voteId
            };

            await _commentVoteRepository.AddAsync(commentVote);
            await _commentVoteRepository.SaveChangesAsync();
        }
    }
}
