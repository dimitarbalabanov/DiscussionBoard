using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserPostVotes.Commands.CreateUserPostVote
{
    public class CreateUserPostVoteCommandHandler : IRequestHandler<CreateUserPostVoteCommand>
    {
        private readonly IRepository<UserPostVote> _votesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreateUserPostVoteCommandHandler(IRepository<UserPostVote> votesRepository, IAuthenticatedUserService authUserService, IMapper mapper)
        {
            _votesRepository = votesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CreateUserPostVoteCommand request, CancellationToken cancellationToken)
        {
            var exists = await _votesRepository
                .AllAsNoTracking()
                .AnyAsync(v => v.PostId == request.PostId && v.CreatorId == _authUserService.UserId);

            if (exists)
            {
                throw new Exception("Already voted");
            }

            //var vote = _mapper.Map<UserPostVote>(request);
            //vote.CreatorId = _authUserService.UserId;
            var vote = new UserPostVote
            {
                Type = Enum.Parse<VoteType>(request.Type, true),
                PostId = request.PostId,
                CreatorId = _authUserService.UserId
            };

            await _votesRepository.AddAsync(vote);
            await _votesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
