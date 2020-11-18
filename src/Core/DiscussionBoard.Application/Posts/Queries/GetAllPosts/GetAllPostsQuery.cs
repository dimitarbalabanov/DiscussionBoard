using DiscussionBoard.Application.Common.Responses;
using MediatR;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQuery : IRequest<PagedResponse<GetAllPostsResponse>>
    {
        public int? ForumId { get; set; }

        public string User { get; set; }

        public string Sort { get; set; }

        public string Top { get; set; }

        public int? Cursor { get; set; }
    }
}
