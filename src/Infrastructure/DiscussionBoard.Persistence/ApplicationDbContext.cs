using DiscussionBoard.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Forum> Forums { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public override int SaveChanges() => SaveChanges(true);

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            ApplyAuditInfoRules();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
            SaveChangesAsync(true, cancellationToken);

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            ApplyAuditInfoRules();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }

        private void ApplyAuditInfoRules()
        {
            //var changedEntries = this.ChangeTracker
            //    .Entries()
            //    .Where(e =>
            //        e.Entity is IAuditInfo &&
            //        (e.State == EntityState.Added || e.State == EntityState.Modified));

            //foreach (var entry in changedEntries)
            //{
            //    var entity = (IAuditInfo)entry.Entity;
            //    if (entry.State == EntityState.Added && entity.CreatedOn == default(DateTime))
            //    {
            //        entity.CreatedOn = DateTime.UtcNow;
            //    }
            //    else
            //    {
            //        entity.ModifiedOn = DateTime.UtcNow;
            //    }
            //}
        }
    }
}
