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
                .HasMany(f => f.Posts)
                .WithOne(p => p.Forum)
                .HasForeignKey(p => p.ForumId);
        }
    }
}
