using MediatR;

namespace DiscussionBoard.Application.UserSavedPosts.Commands.DeleteUserSavedPost
{
    public class DeleteUserSavedPostCommand : IRequest
    {
        public int PostId { get; set; }
    }
}
