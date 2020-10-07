using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeleteCommentCommandHandler(IRepository<Comment> commentsRepository, IAuthenticatedUserService authUserService)
        {
            _commentsRepository = commentsRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = await _commentsRepository
                .All()
                .SingleOrDefaultAsync(c => c.Id == request.Id);

            if (comment == null)
            {
                throw new NotFoundException(nameof(Comment));
            }

            if (comment.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _commentsRepository.Delete(comment);
            await _commentsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
