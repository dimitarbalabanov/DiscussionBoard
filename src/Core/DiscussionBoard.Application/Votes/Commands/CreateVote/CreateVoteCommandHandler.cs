using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
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
            var vote = _mapper.Map<Vote>(request);
            await _votesRepository.AddAsync(vote);
            await _votesRepository.SaveChangesAsync();

            return vote.Id;
        }
    }
}
