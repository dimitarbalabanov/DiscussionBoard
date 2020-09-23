using MediatR;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommand : IRequest<CreateCommentCommandResponse>
    {
        public string Content { get; set; }

        public string CreatorId { get; set; }

        public int PostId { get; set; }
    }
}
