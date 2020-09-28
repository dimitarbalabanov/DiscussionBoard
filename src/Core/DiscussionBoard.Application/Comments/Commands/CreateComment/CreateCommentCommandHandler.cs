using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CreateCommentCommandResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<ApplicationUser> _userRepository;
        public CreateCommentCommandHandler(IRepository<Comment> commentsRepository, IMapper mapper, IRepository<ApplicationUser> userRepository)
        {   
            _commentsRepository = commentsRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<CreateCommentCommandResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = _mapper.Map<Comment>(request);
            await _commentsRepository.AddAsync(comment);
            await _commentsRepository.SaveChangesAsync();
            var creator = await _userRepository
                .AllAsNoTracking()
                .Where(u => u.Id == request.CreatorId)
                .Select(u => new { u.UserName, u.AvatarUrl })
                .FirstOrDefaultAsync();
            var response = _mapper.Map<CreateCommentCommandResponse>(comment);
            response.CreatorUserName = creator.UserName;
            response.CreatorAvatarUrl = creator.AvatarUrl;
            return _mapper.Map<CreateCommentCommandResponse>(comment);
        }
    }
}
