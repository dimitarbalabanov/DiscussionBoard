using AutoMapper;
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
    public class CreateCommentVoteCommandHandler : IRequestHandler<CreateCommentVoteCommand, CreateCommentVoteCommandResponse>
    {
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreateCommentVoteCommandHandler(
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper, IRepository<Comment> commentsRepository)
        {
            _commentVotesRepository = commentVotesRepository ?? throw new ArgumentNullException(nameof(commentVotesRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
        }

        public async Task<CreateCommentVoteCommandResponse> Handle(CreateCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;
            var hasAlreadyVoted = await _commentVotesRepository
                   .AllAsNoTracking()
                   .AnyAsync(cv => cv.CommentId == request.CommentId && cv.CreatorId == userId);

            if (hasAlreadyVoted)
            {
                throw new BadRequestException("User has already voted");
            }

            var comment = await _commentsRepository
                .All()
                .SingleOrDefaultAsync(p => p.Id == request.CommentId);

            if (comment == null)
            {
                throw new NotFoundException(nameof(Comment));
            }

            var commentVote = _mapper.Map<CommentVote>(request);
            commentVote.CreatorId = userId;
            await _commentVotesRepository.AddAsync(commentVote);
            await _commentVotesRepository.SaveChangesAsync();

            switch (commentVote.Type)
            {
                case VoteType.Down:
                    comment.VotesScore--;
                    break;
                case VoteType.Up:
                    comment.VotesScore++;
                    break;
                default:
                    break;
            }

            _commentsRepository.Update(comment);
            await _commentsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentVoteCommandResponse>(commentVote);
            return response;
        }
    }
}
