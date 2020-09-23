using MediatR;

namespace DiscussionBoard.Application.Posts.Commands.DeletePost
{
    public class DeletePostCommand : IRequest
    {
        public int Id { get; set; }

        public string CreatorId { get; set; }
    }
}
