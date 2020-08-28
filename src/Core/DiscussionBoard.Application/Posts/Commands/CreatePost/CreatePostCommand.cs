using MediatR;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommand : IRequest<int>
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatorId { get; set; }

        public int ForumId { get; set; }
    }
}

