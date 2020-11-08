using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentVotes.Commands.UpdateCommentVote
{
    public class UpdateCommentVoteCommandHandler : IRequestHandler<UpdateCommentVoteCommand>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public UpdateCommentVoteCommandHandler(
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService authUserService)
        {
            _commentVotesRepository = commentVotesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(UpdateCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var commentVote = await _commentVotesRepository
               .All()
               .SingleOrDefaultAsync(v => v.Id == request.CommentVoteId);

            if (commentVote == null)
            {
                throw new NotFoundException(nameof(CommentVote));
            }

            if (commentVote.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            commentVote.Type = Enum.Parse<VoteType>(request.Type, true);
            await _commentVotesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
