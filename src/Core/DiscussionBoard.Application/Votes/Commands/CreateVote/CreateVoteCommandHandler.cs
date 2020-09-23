using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Votes.Commands.CreateVote
{
    public class CreateVoteCommandHandler : IRequestHandler<CreateVoteCommand, int>
    {
        private readonly IRepository<Vote> _votesRepository;
        private readonly IMapper _mapper;

        public CreateVoteCommandHandler(IRepository<Vote> votesRepository, IMapper mapper)
        {
            _votesRepository = votesRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateVoteCommand request, CancellationToken cancellationToken)
        {
            var exists = await _votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.CommentId == request.CommentId && v.CreatorId == request.CreatorId) != null;

            if (exists)
            {
                throw new Exception("Already voted");
            }

            var vote = _mapper.Map<Vote>(request);
            await _votesRepository.AddAsync(vote);
            await _votesRepository.SaveChangesAsync();

            var score = await _votesRepository
                .AllAsNoTracking()
                .Where(v => v.CommentId == request.CommentId)
                .SumAsync(v => (int)v.Type);

            return score;
        }
    }
}
