using System.Collections.Generic;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsResponse
    {
        public IEnumerable<PostDto> Posts { get; set; }
    }
}
