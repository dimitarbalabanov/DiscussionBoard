using System.Collections.Generic;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsVm
    {
        public IEnumerable<GetAllPostsPostDto> Posts { get; set; }
    }
}
