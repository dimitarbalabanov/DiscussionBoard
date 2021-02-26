using DiscussionBoard.Application.Common.Helpers;
using System.Collections.Generic;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsResponse : ICanBePaged<CommentDto>
    {
        public IEnumerable<CommentDto> Items { get; set; }
    }
}
