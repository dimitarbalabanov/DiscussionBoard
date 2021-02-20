using MediatR;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Forums.Commands.UpdateForum
{
    public class UpdateForumCommand : IRequest<UpdateForumCommandResponse>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Description { get; set; }

        public IFormFile ForumMedia { get; set; }
    }
}
