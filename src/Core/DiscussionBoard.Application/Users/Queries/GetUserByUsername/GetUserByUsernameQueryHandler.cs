using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Users.Queries.GetUserByUsername
{
    public class GetUserByUsernameQueryHandler : IRequestHandler<GetUserByUsernameQuery, GetUserByUsernameQueryResponse>
    {
        private readonly IRepository<User> _usersRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetUserByUsernameQueryHandler(
            IRepository<User> usersRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<GetUserByUsernameQueryResponse> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
        {
            var result = await _usersRepository
                .AllAsNoTracking()
                .Where(u => u.UserName == request.UserName)
                .ProjectTo<GetUserByUsernameQueryResponse>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            if (result == null)
            {
                throw new NotFoundException(nameof(User));
            }

            return result;
        }
    }
}
