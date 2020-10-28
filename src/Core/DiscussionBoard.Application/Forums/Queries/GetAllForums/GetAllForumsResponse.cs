using System.Collections.Generic;

namespace DiscussionBoard.Application.Forums.Queries.GetAllForums
{
    public class GetAllForumsResponse
    {
        public IEnumerable<ForumDto> Forums { get; set; }
    }
}
