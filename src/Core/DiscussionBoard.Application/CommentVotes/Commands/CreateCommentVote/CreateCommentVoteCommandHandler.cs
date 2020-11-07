using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentVotes.Commands.CreateCommentVote
{
    public class CreateCommentVoteCommandHandler : IRequestHandler<CreateCommentVoteCommand, int>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public CreateCommentVoteCommandHandler(
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService authUserService)
        {
            _commentVotesRepository = commentVotesRepository;
            _authUserService = authUserService;
        }

        public async Task<int> Handle(CreateCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;

            if (await _commentVotesRepository
                   .AllAsNoTracking()
                   .AnyAsync(cv => cv.CommentId == request.CommentId && cv.CreatorId == userId))
            {
                throw new BadRequestException("Already voted");
            }

            var commentVote = new CommentVote
            {
                Type = Enum.Parse<VoteType>(request.Type, true),
                CommentId = request.CommentId,
                CreatorId = userId
            };

            await _commentVotesRepository.AddAsync(commentVote);
            await _commentVotesRepository.SaveChangesAsync();

            return commentVote.Id;
        }
    }
}
