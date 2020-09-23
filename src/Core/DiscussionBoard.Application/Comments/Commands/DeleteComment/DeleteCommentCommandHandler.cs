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

        public DeleteCommentCommandHandler(IRepository<Comment> commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }

        public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = await _commentsRepository
                .All()
                .SingleOrDefaultAsync(c => c.Id == request.Id);

            if (comment == null)
            {
                throw new Exception("Not Found");
            }

            if (comment.CreatorId != request.CreatorId)
            {
                throw new Exception("Unauthorized");
            }

            _commentsRepository.Delete(comment);
            await _commentsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
