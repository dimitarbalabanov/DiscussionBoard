using MediatR;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQuery : IRequest<GetPostByIdResponse>
    {
        public int Id { get; set; }
    }
}
