using AutoMapper;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Commands.UpdateForum
{
    class UpdateForumCommandHandler : IRequestHandler<UpdateForumCommand, UpdateForumCommandResponse>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IIdentityService _identityService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        public UpdateForumCommandHandler(
            IRepository<Forum> forumsRepository,
            IAuthenticatedUserService authUserService,
            IIdentityService identityService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _forumsRepository = forumsRepository ?? throw new ArgumentNullException(nameof(forumsRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<UpdateForumCommandResponse> Handle(UpdateForumCommand request, CancellationToken cancellationToken)
        {
            var forum = await _forumsRepository
                .All()
                .Include(f => f.Media)
                .SingleOrDefaultAsync(f => f.Id == request.Id);

            if (forum == null)
            {
                throw new NotFoundException(nameof(Forum));
            }

            if (!await AuthorizationAccessHelper.HasPermissionToAccessAsync(_authUserService.UserId, forum.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            if (request.ForumMedia != null)
            {
                var mediaPublicId = forum.Media?.PublicId;
                if (mediaPublicId != null)
                {
                    await _mediaService.DestroyImageAsync(mediaPublicId);
                }

                var uploadResult = await _mediaService.UploadImageAsync(request.ForumMedia);
                forum.Media.Url = uploadResult.AbsoluteUri;
                forum.Media.PublicId = uploadResult.PublicId;
            }

            forum.Title = request.Title;
            forum.Subtitle = request.Subtitle;
            forum.Description = request.Description;

            await _forumsRepository.SaveChangesAsync();

            return _mapper.Map<UpdateForumCommandResponse>(forum);
        }
    }
}
