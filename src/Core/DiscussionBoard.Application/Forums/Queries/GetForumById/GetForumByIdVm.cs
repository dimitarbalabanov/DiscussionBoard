using System.Collections.Generic;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdVm
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int PostsCount { get; set; }

        public IEnumerable<PostDto> Posts { get; set; }
    }
}
