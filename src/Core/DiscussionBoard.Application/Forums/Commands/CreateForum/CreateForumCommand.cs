using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommand : IRequest<CreateForumCommandResponse>, IMapTo<Forum>
    {
        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Description { get; set; }

        public IFormFile ForumMedia { get; set; }
    }
}
