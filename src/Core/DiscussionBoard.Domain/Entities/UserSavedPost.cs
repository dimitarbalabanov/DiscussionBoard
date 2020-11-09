﻿using DiscussionBoard.Domain.Common;
using System;

namespace DiscussionBoard.Domain.Entities
{
    public class UserSavedPost : IAuditInfo
    {
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}