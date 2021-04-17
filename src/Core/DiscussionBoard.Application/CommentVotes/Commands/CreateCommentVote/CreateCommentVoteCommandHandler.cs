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
        private readonly IAuthenticatedUserService _userService;
        private readonly IMapper _mapper;

        public CreateCommentVoteCommandHandler(
            IRepository<CommentVote> commentVotesRepository,
            IRepository<Comment> commentsRepository,
            IAuthenticatedUserService userService,
            IMapper mapper)
        {
            _commentVotesRepository = commentVotesRepository ?? throw new ArgumentNullException(nameof(commentVotesRepository));
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreateCommentVoteCommandResponse> Handle(CreateCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var comment = await _commentsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == request.CommentId);

            if (comment == null)
            {
                throw new NotFoundException(nameof(Comment));
            }

            var userId = _userService.UserId;
            var hasAlreadyVoted = await _commentVotesRepository.AllAsNoTracking()
                   .AnyAsync(cv => cv.CommentId == request.CommentId && cv.CreatorId == userId);

            if (hasAlreadyVoted)
            {
                throw new BadRequestException("User has already voted");
            }

            var commentVote = _mapper.Map<CommentVote>(request);
            commentVote.CreatorId = userId;

            await _commentVotesRepository.AddAsync(commentVote);
            await _commentVotesRepository.SaveChangesAsync();

            comment.VotesScore += (int)commentVote.Type;
            _commentsRepository.Update(comment);
            await _commentsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentVoteCommandResponse>(commentVote);
            return response;
        }
    }
}
