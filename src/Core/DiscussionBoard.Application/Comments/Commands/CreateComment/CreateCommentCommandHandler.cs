using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CreateCommentCommandResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;
        public CreateCommentCommandHandler(
            IRepository<Comment> commentsRepository,
            IRepository<User> userRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {   
            _commentsRepository = commentsRepository;
            _mapper = mapper;
            _authUserService = authUserService;
        }

        public IAuthenticatedUserService AuthenticatedUserService { get; }

        public async Task<CreateCommentCommandResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            //var comment = _mapper.Map<Comment>(request);
            //var userId = _authUserService.UserId;
            //comment.CreatorId = userId;

            var comment = new Comment
            {
                Content = request.Content,
                PostId = request.PostId,
                CreatorId = _authUserService.UserId
            };
            await _commentsRepository.AddAsync(comment);
            await _commentsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentCommandResponse>(comment);
            return response;
        }
    }
}
