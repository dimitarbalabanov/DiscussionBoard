using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Commands.UpdatePost
{
    public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand>
    {
        private readonly IRepository<Post> _postsRepository;

        public UpdatePostCommandHandler(IRepository<Post> postsRepository)
        {
            _postsRepository = postsRepository;
        }

        public async Task<Unit> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _postsRepository
                .All()
                .SingleOrDefaultAsync(p => p.Id == request.Id);

            post.Title = request.Title;
            post.Content = request.Content;

            await _postsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
