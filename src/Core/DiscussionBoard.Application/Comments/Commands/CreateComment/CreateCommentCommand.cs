using MediatR;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommand : IRequest<int>
    {
        public string Content { get; set; }

        public string CreatorId { get; set; }

        public int PostId { get; set; }
    }
}
