using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public UpdateCommentCommandHandler(IRepository<Comment> commentsRepository, IAuthenticatedUserService authUserService)
        {
            _commentsRepository = commentsRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
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

            comment.Content = request.Content;
            await _commentsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
