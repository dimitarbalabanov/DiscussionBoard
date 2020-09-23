using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Commands.DeletePost
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
    {
        private readonly IRepository<Post> _postsRepository;

        public DeletePostCommandHandler(IRepository<Post> postsRepository)
        {
            _postsRepository = postsRepository;
        }

        public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _postsRepository
                .All()
                .SingleOrDefaultAsync(p => p.Id == request.Id);

            if (post == null)
            {
                throw new Exception("Not Found");
            }

            if (post.CreatorId != request.CreatorId)
            {
                throw new Exception("Unauthorized");
            }

            _postsRepository.Delete(post);
            await _postsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
