using MediatR;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQuery : IRequest<GetForumByIdResponse>
    {
        public int Id { get; set; }
    }
}
