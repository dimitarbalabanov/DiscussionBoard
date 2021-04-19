using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, CreatePostCommandResponse>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        public CreatePostCommandHandler(
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreatePostCommandResponse> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var post = _mapper.Map<Post>(request);
            post.CreatorId = _userService.UserId;

            if (request.PostMedia != null)
            {
                var uploadResult = await _mediaService.UploadImageAsync(request.PostMedia);
                post.Media = new PostMedia
                {
                    Url = uploadResult.AbsoluteUri,
                    PublicId = uploadResult.PublicId
                };
            }

            await _postsRepository.AddAsync(post);
            await _postsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreatePostCommandResponse>(post);
            return response;
        }
    }
}
