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
               .Property(x => x.Title)
               .IsRequired()
               .HasMaxLength(200);

            forum
               .Property(x => x.Description)
               .IsRequired()
               .HasMaxLength(800);

            forum
                .HasMany(x => x.Posts)
                .WithOne(x => x.Forum)
                .HasForeignKey(x => x.ForumId);
        }
    }
}
