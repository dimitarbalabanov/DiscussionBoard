using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Rule : BaseModel<int>
    {
        public string Description { get; set; }

        public int ForumId { get; set; }

        public Forum Forum { get; set; }

        public ICollection<Report> Reports { get; set; }
    }
}
