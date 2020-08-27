using AutoMapper;
using DiscussionBoard.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using DiscussionBoard.Domain.Entities;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace DiscussionBoard.Application.Forums.Queries.GetAllForums
{
    public class GetAllForumsQueryHandler : IRequestHandler<GetAllForumsQuery, GetAllForumsVm>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IMapper _mapper;

        public GetAllForumsQueryHandler(IRepository<Forum> forumsRepository, IMapper mapper)
        {
            _forumsRepository = forumsRepository;
            _mapper = mapper;
        }

        public async Task<GetAllForumsVm> Handle(GetAllForumsQuery request, CancellationToken cancellationToken)
        {
            var forums = await _forumsRepository
                .AllAsNoTracking()
                .ProjectTo<ForumDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var vm = new GetAllForumsVm { Forums = forums };
            return vm;
        }
    }
}
