using System;

namespace DiscussionBoard.Application.Common.Helpers
{
    public class TopCursor
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public int VotesScore { get; set; }
    }
}
