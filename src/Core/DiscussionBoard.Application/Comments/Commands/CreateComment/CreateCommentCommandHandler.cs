using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CreateCommentCommandResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<ApplicationUser> _userRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;
        public CreateCommentCommandHandler(
            IRepository<Comment> commentsRepository,
            IRepository<ApplicationUser> userRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {   
            _commentsRepository = commentsRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _authUserService = authUserService;
        }

        public IAuthenticatedUserService AuthenticatedUserService { get; }

        public async Task<CreateCommentCommandResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = _mapper.Map<Comment>(request);
            var userId = _authUserService.UserId;
            comment.CreatorId = userId;

            await _commentsRepository.AddAsync(comment);
            await _commentsRepository.SaveChangesAsync();

            var creator = await _userRepository
                .AllAsNoTracking()
                .Where(u => u.Id == userId)
                .Select(u => new { u.UserName, u.AvatarUrl })
                .FirstOrDefaultAsync();

            var response = _mapper.Map<CreateCommentCommandResponse>(comment);
            response.CreatorUserName = creator.UserName;
            response.CreatorAvatarUrl = creator.AvatarUrl;

            return response;
        }
    }
}
