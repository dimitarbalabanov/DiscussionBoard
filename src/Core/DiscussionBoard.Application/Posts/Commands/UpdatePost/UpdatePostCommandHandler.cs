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

namespace DiscussionBoard.Application.Posts.Commands.UpdatePost
{
    public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, UpdatePostCommandResponse>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        public UpdatePostCommandHandler(
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IIdentityService identityService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<UpdatePostCommandResponse> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var post = await _postsRepository.All()
                .Include(p => p.Media)
                .SingleOrDefaultAsync(p => p.Id == request.Id);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (!await AuthorizationAccess.HasPermissionAsync(_userService.UserId, post.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            if (request.PostMedia != null)
            {
                var mediaPublicId = post.Media?.PublicId;
                if (mediaPublicId != null)
                {
                    await _mediaService.DestroyImageAsync(mediaPublicId);
                }

                var uploadResult = await _mediaService.UploadImageAsync(request.PostMedia);
                post.Media.Url = uploadResult.AbsoluteUri;
                post.Media.PublicId = uploadResult.PublicId;
            }

            post.Title = request.Title;
            post.Content = request.Content;
            await _postsRepository.SaveChangesAsync();

            var response = _mapper.Map<UpdatePostCommandResponse>(post);
            return response;
        }
    }
}
