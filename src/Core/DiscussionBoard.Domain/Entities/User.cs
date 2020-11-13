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
            CreatedCommentReports = new HashSet<CommentReport>();
            ResolvedCommentReports = new HashSet<CommentReport>();
            CreatedPostReports = new HashSet<PostReport>();
            ResolvedPostReports = new HashSet<PostReport>();
            PostSaves = new HashSet<UserPostSave>();
        }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string Bio { get; set; }

        public virtual UserMedia Media { get; set; }

        public virtual ICollection<Forum> Forums { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<CommentVote> CommentVotes { get; set; }

        public virtual ICollection<PostVote> PostVotes { get; set; }

        public virtual ICollection<CommentReport> CreatedCommentReports { get; set; }

        public virtual ICollection<CommentReport> ResolvedCommentReports { get; set; }

        public virtual ICollection<PostReport> CreatedPostReports { get; set; }

        public virtual ICollection<PostReport> ResolvedPostReports { get; set; }

        public virtual ICollection<UserPostSave> PostSaves { get; set; }
    }
}
