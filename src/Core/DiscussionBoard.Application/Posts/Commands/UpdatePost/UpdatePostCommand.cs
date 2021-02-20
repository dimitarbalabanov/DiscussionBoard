using MediatR;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Posts.Commands.UpdatePost
{
    public class UpdatePostCommand : IRequest<UpdatePostCommandResponse>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public IFormFile PostMedia { get; set; }
    }
}
