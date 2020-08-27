using System.Collections.Generic;

namespace DiscussionBoard.Application.Forums.Queries.GetAllForums
{
    public class GetAllForumsVm
    {
        public IEnumerable<ForumDto> Forums { get; set; }
    }
}
