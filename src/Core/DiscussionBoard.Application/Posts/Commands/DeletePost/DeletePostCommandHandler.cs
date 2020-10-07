using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Commands.DeletePost
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeletePostCommandHandler(IRepository<Post> postsRepository, IAuthenticatedUserService authUserService)
        {
            _postsRepository = postsRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _postsRepository
                .All()
                .SingleOrDefaultAsync(p => p.Id == request.Id);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (post.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _postsRepository.Delete(post);
            await _postsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
