using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class PostReportConfiguration : IEntityTypeConfiguration<PostReport>
    {
        public void Configure(EntityTypeBuilder<PostReport> postReport)
        {
            postReport
                .Property(pr => pr.Type)
                .IsRequired();

            postReport
                .HasOne(pr => pr.Post)
                .WithMany(p => p.Reports)
                .HasForeignKey(pr => pr.PostId);

            postReport
                .HasOne(pr => pr.Creator)
                .WithMany(u => u.PostReports)
                .HasForeignKey(pr => pr.CreatorId)
                .IsRequired();

            //postReport
            //    .HasOne(pr => pr.Resolver)
            //    .WithMany(u => u.PostReports)
            //    .HasForeignKey(pr => pr.ResolverId);

            postReport
                .HasOne(pr => pr.Rule)
                .WithMany(r => r.PostReports)
                .HasForeignKey(pr => pr.RuleId);
        }
    }
}
