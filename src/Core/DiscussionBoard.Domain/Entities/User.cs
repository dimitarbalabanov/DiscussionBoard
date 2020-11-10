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
            CommentVotes = new HashSet<CommentVote>();
            PostVotes = new HashSet<PostVote>();
            CommentReports = new HashSet<CommentReport>();
            PostReports = new HashSet<PostReport>();
            SavedPosts = new HashSet<UserSavedPost>();
        }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string Bio { get; set; }

        public int UserMediaId { get; set; }
        public UserMedia UserMedia { get; set; }

        public virtual ICollection<Forum> Forums { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<CommentVote> CommentVotes { get; set; }

        public virtual ICollection<PostVote> PostVotes { get; set; }

        public virtual ICollection<CommentReport> CommentReports { get; set; }

        public virtual ICollection<PostReport> PostReports { get; set; }

        public virtual ICollection<UserSavedPost> SavedPosts { get; set; }
    }
}
