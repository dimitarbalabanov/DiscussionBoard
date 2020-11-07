using System;
using System.Collections.Generic;
using DiscussionBoard.Domain.Common;
using Microsoft.AspNetCore.Identity;

namespace DiscussionBoard.Domain.Entities
{
    public class User : IdentityUser, IAuditInfo
    {
        public User()
        {
            Id = Guid.NewGuid().ToString();
            Forums = new HashSet<Forum>();
            Posts = new HashSet<Post>();
            Comments = new HashSet<Comment>();
            Votes = new HashSet<Vote>();
            Reports = new HashSet<Report>();
            SavedPosts = new HashSet<UserSavedPost>();
        }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string Bio { get; set; }

        public int AvatarId { get; set; }
        public UserMedia Avatar { get; set; }

        public virtual ICollection<Forum> Forums { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<Report> Reports { get; set; }

        public virtual ICollection<UserSavedPost> SavedPosts { get; set; }
    }
}
