using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using System;

namespace DiscussionBoard.Domain.Common
{
    public class BaseReport : BaseModel<string>
    {
        public BaseReport()
        {
            Id = Guid.NewGuid().ToString();
        }

        public bool Resolved { get; set; }

        public bool IsSubstantial { get; set; }

        public ReportType Type { get; set; }

        public int RuleId { get; set; }
        public Rule Rule { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }

        //public string ResolverId { get; set; }
        //public User Resolver { get; set; }
    }
}
