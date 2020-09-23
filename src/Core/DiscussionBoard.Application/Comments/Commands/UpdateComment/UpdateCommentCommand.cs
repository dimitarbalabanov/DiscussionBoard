using MediatR;

namespace DiscussionBoard.Application.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommand : IRequest
    {
        public int Id { get; set; }

        public string CreatorId { get; set; }

        public string Content { get; set; }
    }
}
