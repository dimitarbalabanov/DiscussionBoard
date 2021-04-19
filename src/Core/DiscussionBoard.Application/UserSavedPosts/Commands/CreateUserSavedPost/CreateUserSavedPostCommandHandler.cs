using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserSavedPosts.Commands.CreateUserSavedPost
{
    public class CreateUserSavedPostCommandHandler : IRequestHandler<CreateUserSavedPostCommand>
    {
        private readonly IRepository<UserPostSave> _savesRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;

        public CreateUserSavedPostCommandHandler(
            IRepository<UserPostSave> savesRepository,
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService)
        {
            _savesRepository = savesRepository ?? throw new ArgumentNullException(nameof(savesRepository));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task<Unit> Handle(CreateUserSavedPostCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var post = _postsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == request.PostId);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var userId = _userService.UserId;
            var exists = await _savesRepository
                .AllAsNoTracking()
                .AnyAsync(v => v.PostId == request.PostId && v.UserId == userId);

            if (exists)
            {
                throw new BadRequestException("Already saved");
            }

            var save = new UserPostSave
            {
                PostId = request.PostId,
                UserId = userId
            };

            await _savesRepository.AddAsync(save);
            await _savesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
