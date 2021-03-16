using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Commands.DeletePost
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IIdentityService _identityService;
        private readonly IMediaService _mediaService;

        public DeletePostCommandHandler(
            IRepository<Post> postsRepository,
            IAuthenticatedUserService authUserService,
            IIdentityService identityService,
            IMediaService mediaService)
        {
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
        }

        public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _postsRepository
                .All()
                .Include(p => p.Media)
                .SingleOrDefaultAsync(p => p.Id == request.Id);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (!await AuthorizationAccessHelper.HasPermissionToAccessAsync(_authUserService.UserId, post.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            var mediaPublicId = post.Media?.PublicId;
            if (mediaPublicId != null)
            {
                await _mediaService.DestroyImageAsync(mediaPublicId);
            }

            _postsRepository.Delete(post);
            await _postsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
