using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommand : IRequest<CreatePostCommandResponse>, IMapTo<Post>
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public int ForumId { get; set; }

        [NotMapped]
        public IFormFile PostMedia { get; set; }
    }
}

