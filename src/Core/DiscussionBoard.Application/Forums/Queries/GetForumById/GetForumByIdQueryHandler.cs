using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQueryHandler : IRequestHandler<GetForumByIdQuery, GetForumByIdResponse>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IMapper _mapper;
        public GetForumByIdQueryHandler(IRepository<Forum> forumsRepository, IMapper mapper)
        {
            _forumsRepository = forumsRepository;
            _mapper = mapper;
        }

        public async Task<GetForumByIdResponse> Handle(GetForumByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _forumsRepository
                .AllAsNoTracking()
                .Where(f => f.Id == request.Id)
                .ProjectTo<GetForumByIdResponse>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            return vm;
        }
    }
}
