using MediatR;

namespace DiscussionBoard.Application.UserSavedPosts.Commands.CreateUserSavedPost
{
    public class CreateUserSavedPostCommand : IRequest
    {
        public int PostId { get; set; }
    }
}
