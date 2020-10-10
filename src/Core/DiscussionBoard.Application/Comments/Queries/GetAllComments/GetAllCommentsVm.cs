using System.Collections.Generic;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsVm
    {
        public IEnumerable<CommentDto> Comments { get; set; }
    }
}
