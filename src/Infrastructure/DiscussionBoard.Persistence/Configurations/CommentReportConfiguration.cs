using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class CommentReportConfiguration : IEntityTypeConfiguration<CommentReport>
    {
        public void Configure(EntityTypeBuilder<CommentReport> commentReport)
        {
            commentReport
                .Property(cr => cr.Type)
                .IsRequired();

            commentReport
                .HasOne(cr => cr.Comment)
                .WithMany(c => c.Reports)
                .HasForeignKey(cr => cr.CommentId);

            commentReport
                .HasOne(cr => cr.Creator)
                .WithMany(u => u.CreatedCommentReports)
                .HasForeignKey(cr => cr.CreatorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            commentReport
                .HasOne(cr => cr.Resolver)
                .WithMany(u => u.ResolvedCommentReports)
                .HasForeignKey(cr => cr.ResolverId)
                .OnDelete(DeleteBehavior.Restrict);
            //commentReport
            //    .HasOne(cr => cr.Resolver)
            //    .WithMany(u => u.CommentReports)
            //    .HasForeignKey(cr => cr.ResolverId);

            commentReport
                .HasOne(cr => cr.Rule)
                .WithMany(r => r.CommentReports)
                .HasForeignKey(cr => cr.RuleId);
        }
    }
}
