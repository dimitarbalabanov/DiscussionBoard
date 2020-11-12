using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class PostMediaConfiguration : IEntityTypeConfiguration<PostMedia>
    {
        public void Configure(EntityTypeBuilder<PostMedia> postMedia)
        {
            postMedia
               .Property(pm => pm.Url)
               .IsRequired()
               .HasMaxLength(200);

            postMedia
               .Property(pm => pm.PublicId)
               .IsRequired()
               .HasMaxLength(200);

            postMedia
                .HasOne(pm => pm.Post)
                .WithOne(p => p.Media)
                .HasForeignKey<PostMedia>(pm => pm.PostId);
        }
    }
}
