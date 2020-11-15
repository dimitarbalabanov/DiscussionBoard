using MediatR;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdQuery : IRequest<GetForumByIdResponse>
    {
        public GetForumByIdQuery(int id)
        {
            Id = id;
        }

        public int Id { get; private set; }
    }
}
