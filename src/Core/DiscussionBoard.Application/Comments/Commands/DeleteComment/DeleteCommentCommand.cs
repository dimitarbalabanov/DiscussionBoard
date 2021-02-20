using MediatR;

namespace DiscussionBoard.Application.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommand : IRequest
    {
        public int Id { get; set; }
    }
}
