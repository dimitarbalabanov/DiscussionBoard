using System.Collections.Generic;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsVm
    {
        public IEnumerable<PostDto> Posts { get; set; }

        //public int? PageNumber { get; set; }

        //public int? PageSize { get; set; }

        public int? NextPage { get; set; }

        //public string PreviousPage { get; set; }
    }
}
