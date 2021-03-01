using DiscussionBoard.Application.Common.Helpers;
using System.Collections.Generic;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsResponse
    {
        public IEnumerable<CommentDto> Comments { get; set; }
    }
}
