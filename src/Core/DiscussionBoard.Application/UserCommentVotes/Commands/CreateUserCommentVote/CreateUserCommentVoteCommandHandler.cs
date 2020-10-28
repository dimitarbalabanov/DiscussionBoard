using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.CreateUserCommentVote
{
    public class CreateUserCommentVoteCommandHandler : IRequestHandler<CreateUserCommentVoteCommand>
    {
        private readonly IRepository<UserCommentVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreateUserCommentVoteCommandHandler(IRepository<UserCommentVote> votesRepository, IAuthenticatedUserService authUserService, IMapper mapper)
        {
            _votesRepository = votesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CreateUserCommentVoteCommand request, CancellationToken cancellationToken)
        {
            var exists = await _votesRepository
                .AllAsNoTracking()
                .AnyAsync(v => v.CommentId == request.CommentId && v.CreatorId == _authUserService.UserId);

            if (exists)
            {
                throw new Exception("Already voted");
            }

            //var vote = _mapper.Map<UserCommentVote>(request);
            //vote.CreatorId = _authUserService.UserId;

            var vote = new UserCommentVote
            {
                Type = Enum.Parse<VoteType>(request.Type, true),
                CommentId = request.CommentId,
                CreatorId = _authUserService.UserId
            };

            await _votesRepository.AddAsync(vote);
            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
