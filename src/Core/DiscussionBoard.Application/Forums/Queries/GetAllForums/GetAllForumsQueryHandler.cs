using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using DiscussionBoard.Domain.Entities;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DiscussionBoard.Application.Forums.Queries.GetAllForums
{
    public class GetAllForumsQueryHandler : IRequestHandler<GetAllForumsQuery, GetAllForumsResponse>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IMapper _mapper;

        public GetAllForumsQueryHandler(IRepository<Forum> forumsRepository, IMapper mapper)
        {
            _forumsRepository = forumsRepository;
            _mapper = mapper;
        }

        public async Task<GetAllForumsResponse> Handle(GetAllForumsQuery request, CancellationToken cancellationToken)
        {
            var forums = await _forumsRepository
                .AllAsNoTracking()
                .OrderByDescending(f => f.Posts.Count)
                .ProjectTo<ForumDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var response = new GetAllForumsResponse { Forums = forums };
            return response;
        }
    }
}
