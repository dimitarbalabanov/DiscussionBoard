using MediatR;

namespace DiscussionBoard.Application.Forums.Commands.DeleteForum
{
    public class DeleteForumCommand : IRequest
    {
        public int Id { get; set; }
    }
}
