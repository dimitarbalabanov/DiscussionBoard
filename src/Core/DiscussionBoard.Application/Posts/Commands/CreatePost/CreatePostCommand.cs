using MediatR;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommand : IRequest<CreatePostCommandResponse>
    {
        //public CreatePostCommand(string title, string content, int forumId, IFormFile postMedia)
        //{
        //    Title = title;
        //    Content = content;
        //    ForumId = forumId;
        //    PostMedia = postMedia;
        //}

        public string Title { get; private set; }

        public string Content { get; private set; }

        public int ForumId { get; private set; }

        public IFormFile PostMedia { get; private set; }
    }
}

