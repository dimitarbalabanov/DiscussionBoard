﻿using DiscussionBoard.Application.Common.Interfaces;
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
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Forum> Forums { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Vote> Votes { get; set; }

        public DbSet<CommentVote> CommentsVotes { get; set; }

        public DbSet<PostVote> PostsVotes { get; set; }

        public DbSet<UserSavedPost> UsersSavedPosts { get; set; }

        public DbSet<PostsVotesScores> PostsVotesScores { get; set; }

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



//CREATE VIEW View_PostsVotesScores AS 
//SELECT [p0].[Id], (
//SELECT SUM(CAST([v].[Type] AS int))
//    FROM[PostsVotes] AS[p]
//    INNER JOIN[Votes] AS [v] ON[p].[VoteId] = [v].[Id]
//    WHERE[p0].[Id] = [p].[PostId]) AS[VotesScore]
//FROM[Posts] AS[p0]

