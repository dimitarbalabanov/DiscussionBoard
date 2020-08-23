using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DiscussionBoard.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            Id = Guid.NewGuid().ToString();
            Posts = new HashSet<Post>();
            Comments = new HashSet<Comment>();
        }

        public string Bio { get; set; }

        public string AvatarUrl { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
