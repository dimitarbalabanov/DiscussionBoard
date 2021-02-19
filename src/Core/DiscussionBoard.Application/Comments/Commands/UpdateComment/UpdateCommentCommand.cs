using MediatR;

namespace DiscussionBoard.Application.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommand : IRequest
    {
        public int CommentId { get; set; }

        public string Content { get; set; }
    }
}
