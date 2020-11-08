using MediatR;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommand : IRequest<CreateForumCommandResponse>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }

        public IFormFile MediaFile { get; set; }

        public IEnumerable<string> Rules { get; set; }
    }
}
