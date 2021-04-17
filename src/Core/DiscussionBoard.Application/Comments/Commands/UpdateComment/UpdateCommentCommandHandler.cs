using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;

        public UpdateCommentCommandHandler(
            IRepository<Comment> commentsRepository,
            IAuthenticatedUserService userService,
            IIdentityService identityService)
        {
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
        }

        public async Task<Unit> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
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

            if (!await AuthorizationAccess.HasPermissionAsync(_userService.UserId, comment.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            comment.Content = request.Content;
            await _commentsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
