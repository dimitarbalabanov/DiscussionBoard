using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Commands.DeleteForum
{
    public class DeleteForumCommandHandler : IRequestHandler<DeleteForumCommand>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IIdentityService _identityService;
        private readonly IMediaService _mediaService;

        public DeleteForumCommandHandler(
            IRepository<Forum> forumsRepository,
            IAuthenticatedUserService authUserService,
            IIdentityService identityService,
            IMediaService mediaService)
        {
            _forumsRepository = forumsRepository ?? throw new ArgumentNullException(nameof(forumsRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
        }

        public async Task<Unit> Handle(DeleteForumCommand request, CancellationToken cancellationToken)
        {
            var forum = await _forumsRepository
                .All()
                .Include(f => f.Media)
                .SingleOrDefaultAsync(f => f.Id == request.Id);

            if (forum == null)
            {
                throw new NotFoundException(nameof(Forum));
            }

            if (!await AuthorizationAccess.HasPermissionAsync(_authUserService.UserId, forum.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            var mediaPublicId = forum.Media?.PublicId;
            if (mediaPublicId != null)
            {
                await _mediaService.DestroyImageAsync(mediaPublicId);
            }

            _forumsRepository.Delete(forum);
            await _forumsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
