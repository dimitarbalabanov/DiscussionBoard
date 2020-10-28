using DiscussionBoard.Application.Common.Queries;
using DiscussionBoard.Application.Common.Responses;
using MediatR;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQuery : IRequest<PagedResponse<GetAllPostsResponse>>
    {
        public int? ForumId { get; set; }

        //public string Filter { get; set; }

        //public string Sort { get; set; }

        //public string Order { get; set; }

        //public string Cursor { get; set; }
    }
}
