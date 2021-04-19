using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserSavedPosts.Commands.DeleteUserSavedPost
{
    public class DeleteUserSavedPostCommandHandler : IRequestHandler<DeleteUserSavedPostCommand>
    {
        private readonly IRepository<UserPostSave> _savesRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;

        public DeleteUserSavedPostCommandHandler(
            IRepository<UserPostSave> savesRepository,
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IIdentityService identityService)
        {
            _savesRepository = savesRepository ?? throw new ArgumentNullException(nameof(savesRepository));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
        }

        public async Task<Unit> Handle(DeleteUserSavedPostCommand request, CancellationToken cancellationToken)
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

            var save = await _savesRepository
                .AllAsNoTracking()
                .SingleOrDefaultAsync(v => v.PostId == request.PostId && v.UserId == userId);

            if (save == null)
            {
                throw new NotFoundException(nameof(UserPostSave));
            }

            if (!await AuthorizationAccess.HasPermissionAsync(userId, save.UserId, _identityService))
            {
                throw new ForbiddenException();
            }

            _savesRepository.Delete(save);
            await _savesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
