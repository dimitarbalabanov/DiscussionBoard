using AutoMapper;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserSavedPosts.Commands.DeleteUserSavedPost
{
    public class DeleteUserSavedPostCommandHandler : IRequestHandler<DeleteUserSavedPostCommand>
    {
        private readonly IRepository<UserSavedPost> _savedRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public DeleteUserSavedPostCommandHandler(IRepository<UserSavedPost> savedRepository, IAuthenticatedUserService authUserService, IMapper mapper)
        {
            _savedRepository = savedRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(DeleteUserSavedPostCommand request, CancellationToken cancellationToken)
        {
            var savedPost = await _savedRepository
                .AllAsNoTracking()
                .SingleOrDefaultAsync(v => v.PostId == request.PostId && v.UserId == _authUserService.UserId);

            if (savedPost == null)
            {
                throw new NotFoundException(nameof(UserPostVote));
            }

            _savedRepository.Delete(savedPost);
            await _savedRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
