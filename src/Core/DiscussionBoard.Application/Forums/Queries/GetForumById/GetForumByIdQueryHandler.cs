using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQueryHandler : IRequestHandler<GetForumByIdQuery, GetForumByIdVm>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IMapper _mapper;
        public GetForumByIdQueryHandler(IRepository<Forum> forumsRepository, IMapper mapper)
        {
            _forumsRepository = forumsRepository;
            _mapper = mapper;
        }

        public async Task<GetForumByIdVm> Handle(GetForumByIdQuery request, CancellationToken cancellationToken)
        {
            var forum = await _forumsRepository
                .AllAsNoTracking()
                .Include(f => f.Posts)
                .SingleOrDefaultAsync(f => f.Id == request.Id);

            var vm = _mapper.Map<GetForumByIdVm>(forum);
            return vm;
        }
    }
}
