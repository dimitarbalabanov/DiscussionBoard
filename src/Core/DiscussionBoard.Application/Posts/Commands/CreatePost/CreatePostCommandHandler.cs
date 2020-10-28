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
        private readonly IMapper _mapper;

        public CreatePostCommandHandler(IRepository<Post> postsRepository, IAuthenticatedUserService authUserService, IMapper mapper)
        {
            _postsRepository = postsRepository;
            _authUserService = authUserService;
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
            await _postsRepository.AddAsync(post);
            await _postsRepository.SaveChangesAsync();

            return _mapper.Map<CreatePostCommandResponse>(post);
        }
    }
}
