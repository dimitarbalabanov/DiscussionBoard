using AutoMapper;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Users.Commands.UpdateUser
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
    {
        private readonly IRepository<User> _usersRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        public UpdateUserCommandHandler(
            IRepository<User> usersRepository,
            IAuthenticatedUserService authUserService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _usersRepository
                .All()
                .SingleOrDefaultAsync(u => u.Id == _authUserService.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(User));
            }

            user.Bio = request.Bio;

            if (request.MediaFile != null)
            {
                var uploadResult = await _mediaService.UploadImageAsync(request.MediaFile);
                user.Media = _mapper.Map<UserMedia>(uploadResult);
            }

            _usersRepository.Update(user);
            await _usersRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
