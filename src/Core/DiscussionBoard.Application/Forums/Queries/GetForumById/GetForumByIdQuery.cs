using MediatR;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQuery : IRequest<GetForumByIdVm>
    {
        public int Id { get; set; }
    }
}
