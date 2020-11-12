using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class ForumConfiguration : IEntityTypeConfiguration<Forum>
    {
        public void Configure(EntityTypeBuilder<Forum> forum)
        {
            forum
               .Property(f => f.Title)
               .IsRequired()
               .HasMaxLength(200);

            forum
               .Property(f => f.Description)
               .IsRequired()
               .HasMaxLength(800);

            forum
               .Property(f => f.Color)
               .HasMaxLength(6);

            forum
                .HasOne(f => f.Creator)
                .WithMany(u => u.Forums)
                .HasForeignKey(f => f.CreatorId)
                .IsRequired();

            forum
                .HasOne(f => f.Media)
                .WithOne(fm => fm.Forum)
                .HasForeignKey<ForumMedia>(fm => fm.ForumId)
                .HasConstraintName("ForumMediaId");

            forum
                .HasMany(f => f.Posts)
                .WithOne(p => p.Forum)
                .HasForeignKey(p => p.ForumId);

            forum
                .HasMany(f => f.Rules)
                .WithOne(r => r.Forum)
                .HasForeignKey(r => r.ForumId);
        }
    }
}
