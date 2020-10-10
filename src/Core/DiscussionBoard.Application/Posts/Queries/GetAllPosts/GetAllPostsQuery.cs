using MediatR;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQuery : IRequest<GetAllPostsVm>
    {
        public int? ForumId { get; set; }
    }
}
