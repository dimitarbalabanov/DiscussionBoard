using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class RuleConfiguration : IEntityTypeConfiguration<Rule>
    {
        public void Configure(EntityTypeBuilder<Rule> rule)
        {
            rule
               .Property(r => r.Description)
               .IsRequired()
               .HasMaxLength(200);

            rule
                .HasOne(r => r.Forum)
                .WithMany(f => f.Rules)
                .HasForeignKey(r => r.ForumId);

            rule
                .HasMany(r => r.CommentReports)
                .WithOne(cr => cr.Rule)
                .HasForeignKey(cr => cr.RuleId)
                .OnDelete(DeleteBehavior.NoAction);

            rule
                .HasMany(r => r.PostReports)
                .WithOne(pr => pr.Rule)
                .HasForeignKey(pr => pr.RuleId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
