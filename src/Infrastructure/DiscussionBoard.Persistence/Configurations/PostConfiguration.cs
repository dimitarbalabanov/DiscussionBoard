using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> post)
        {
            post
               .Property(x => x.Title)
               .IsRequired()
               .HasMaxLength(200);

            post
               .Property(x => x.Content)
               .IsRequired()
               .HasMaxLength(2500);

            post
                .HasOne(x => x.Creator)
                .WithMany(x => x.Posts)
                .HasForeignKey(x => x.CreatorId);

            post
                .HasOne(x => x.Forum)
                .WithMany(x => x.Posts)
                .HasForeignKey(x => x.ForumId);

            post
                .HasMany(x => x.Comments)
                .WithOne(x => x.Post)
                .HasForeignKey(x => x.PostId);
        }
    }
}
