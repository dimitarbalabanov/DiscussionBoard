using System.Collections.Generic;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdVm
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        //public string CreatorId { get; set; }
        //public virtual ApplicationUser Creator { get; set; }

        public IEnumerable<CommentDto> Comments { get; set; }
    }
}
