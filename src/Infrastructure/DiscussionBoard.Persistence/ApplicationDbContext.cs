using DiscussionBoard.Domain.Common;
using DiscussionBoard.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Forum> Forums { get; set; }

        public DbSet<ForumMedia> ForumMedias { get; set; }

        public DbSet<Rule> Rules { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostVote> PostVotes { get; set; }

        public DbSet<PostReport> PostReports { get; set; }

        public DbSet<PostMedia> PostMedias { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<CommentVote> CommentVotes { get; set; }

        public DbSet<CommentReport> CommentReports { get; set; }

        public DbSet<UserMedia> UserMedias { get; set; }

        public DbSet<UserPostSave> UserPostSaves { get; set; }

        //public DbSet<PostsVotesScores> PostsVotesScores { get; set; }
        //CREATE VIEW View_PostsVotesScores AS 
        //SELECT [p0].[Id], (
        //SELECT SUM(CAST([v].[Type] AS int))
        //    FROM[PostsVotes] AS[p]
        //    INNER JOIN[Votes] AS [v] ON[p].[VoteId] = [v].[Id]
        //    WHERE[p0].[Id] = [p].[PostId]) AS[VotesScore]
        //FROM[Posts] AS[p0]

        //[Table("View_PostsVotesScores")]
        //public class PostsVotesScores : IAuditInfo
        //{
        //    public int Id { get; set; }

        //    public int? VotesScore { get; set; }

        //    public DateTime CreatedOn { get; set; }

        //    public DateTime? ModifiedOn { get; set; }
        //}

        public override int SaveChanges()
        {
            ApplyAuditInfoRules();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ApplyAuditInfoRules();
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }

        private void ApplyAuditInfoRules()
        {
            var changedEntries = ChangeTracker
                .Entries()
                .Where(e =>
                    e.Entity is IAuditInfo &&
                    (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in changedEntries)
            {
                var entity = (IAuditInfo)entry.Entity;
                if (entry.State == EntityState.Added && entity.CreatedOn == default)
                {
                    entity.CreatedOn = DateTime.UtcNow;
                }
                else
                {
                    entity.ModifiedOn = DateTime.UtcNow;
                }
            }
        }
    }
}
