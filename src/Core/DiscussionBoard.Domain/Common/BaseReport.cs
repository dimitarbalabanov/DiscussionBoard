using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using System;

namespace DiscussionBoard.Domain.Common
{
    public abstract class BaseReport : BaseModel<string>
    {
        protected BaseReport()
        {
            Id = Guid.NewGuid().ToString();
        }

        public bool Resolved { get; set; }

        public bool IsSubstantial { get; set; }

        public ReportType Type { get; set; }

        public int? RuleId { get; set; }
        public Rule Rule { get; set; }

        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public string ResolverId { get; set; }
        public User Resolver { get; set; }
    }
}
