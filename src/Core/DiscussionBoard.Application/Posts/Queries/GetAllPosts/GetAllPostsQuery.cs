using DiscussionBoard.Application.Common.Queries;
using MediatR;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQuery : IRequest<GetAllPostsVm>
    {
        //public GetAllPostsQuery()
        //{
        //    PageNumber = 1;
        //}

        //public GetAllPostsQuery(int pageNumber)
        //{
        //    PageNumber = pageNumber;
        //}

        public int? ForumId { get; set; }

        public int? PageNumber { get; set; }
    }
}
