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
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IIdentityService _identityService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;


        public UpdatePostCommandHandler(
            IRepository<Post> postsRepository,
            IAuthenticatedUserService authUserService,
            IIdentityService identityService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<UpdatePostCommandResponse> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _postsRepository
                .All()
                .Include(p => p.Media)
                .SingleOrDefaultAsync(p => p.Id == request.Id);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (!await AuthorizationAccess.HasPermissionAsync(_authUserService.UserId, post.CreatorId, _identityService))
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

            return _mapper.Map<UpdatePostCommandResponse>(post);
        }
    }
}
