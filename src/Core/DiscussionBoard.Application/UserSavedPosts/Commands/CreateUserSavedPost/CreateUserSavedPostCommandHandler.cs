using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.UserSavedPosts.Commands.CreateUserSavedPost
{
    public class CreateUserSavedPostCommandHandler : IRequestHandler<CreateUserSavedPostCommand>
    {
        private readonly IRepository<UserPostSave> _savedRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public CreateUserSavedPostCommandHandler(IRepository<UserPostSave> savedRepository, IAuthenticatedUserService authUserService)
        {
            _savedRepository = savedRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(CreateUserSavedPostCommand request, CancellationToken cancellationToken)
        {
            var exists = await _savedRepository
                .AllAsNoTracking()
                .AnyAsync(v => v.PostId == request.PostId && v.UserId == _authUserService.UserId);

            if (exists)
            {
                throw new Exception("Already saved");
            }

            var userSavedPost = new UserPostSave
            {
                PostId = request.PostId,
                UserId = _authUserService.UserId
            };

            await _savedRepository.AddAsync(userSavedPost);
            await _savedRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
