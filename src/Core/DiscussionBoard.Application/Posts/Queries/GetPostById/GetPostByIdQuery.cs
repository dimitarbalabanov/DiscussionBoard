using MediatR;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQuery : IRequest<GetPostByIdVm>
    {
        public int Id { get; set; }
    }
}
