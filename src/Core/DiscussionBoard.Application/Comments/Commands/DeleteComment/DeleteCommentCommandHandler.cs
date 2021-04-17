using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;

        public DeleteCommentCommandHandler(
            IRepository<Comment> commentsRepository,
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IIdentityService identityService)
        {
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
        }

        public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var comment = await _commentsRepository.All()
                .SingleOrDefaultAsync(c => c.Id == request.Id);

            if (comment == null)
            {
                throw new NotFoundException(nameof(Comment));
            }

            var userId = _userService.UserId;
            if (userId != comment.CreatorId)
            {
                if (!await _identityService.IsAdminAsync(userId))
                {
                    throw new ForbiddenException();
                }
            }

            _commentsRepository.Delete(comment);
            await _commentsRepository.SaveChangesAsync();

            var post = await _postsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == comment.PostId);

            post.CommentsCount++;
            _postsRepository.Update(post);
            await _postsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
