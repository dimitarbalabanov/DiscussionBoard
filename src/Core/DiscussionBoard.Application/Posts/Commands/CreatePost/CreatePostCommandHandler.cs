using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, CreatePostCommandResponse>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        public CreatePostCommandHandler(
            IRepository<Post> postsRepository,
            IAuthenticatedUserService authUserService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _authUserService = authUserService;
            _mediaService = mediaService;
            _mapper = mapper;
        }

        public async Task<CreatePostCommandResponse> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            //var post = _mapper.Map<Post>(request);
            //post.CreatorId = _authUserService.UserId;

            var post = new Post
            {
                Title = request.Title,
                Content = request.Content,
                ForumId = request.ForumId,
                CreatorId = _authUserService.UserId
            };

            if (request.PostMedia != null)
            {
                var uploadResult = await _mediaService.UploadImageAsync(request.PostMedia, request.PostMedia.FileName);
                post.PostMedia = new PostMedia
                {
                    Url = uploadResult.AbsoluteUri,
                    PublicId = uploadResult.PublicId
                };
            }

            await _postsRepository.AddAsync(post);
            await _postsRepository.SaveChangesAsync();

            //return _mapper.Map<CreatePostCommandResponse>(post);
            return new CreatePostCommandResponse { Id = post.Id, CreatedOn = post.CreatedOn, MediaUrl = post.PostMedia?.Url ?? ""};
        }
    }
}
