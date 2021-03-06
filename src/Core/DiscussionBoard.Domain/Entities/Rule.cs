﻿using DiscussionBoard.Domain.Common;
using System.Collections.Generic;

namespace DiscussionBoard.Domain.Entities
{
    public class Rule : BaseModel<int>
    {
        public Rule()
        {
            CommentReports = new HashSet<CommentReport>();
            PostReports = new HashSet<PostReport>();
        }

        public string Title { get; set; }

        public string Description { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public virtual ICollection<CommentReport> CommentReports { get; set; }

        public virtual ICollection<PostReport> PostReports { get; set; }
    }
}
