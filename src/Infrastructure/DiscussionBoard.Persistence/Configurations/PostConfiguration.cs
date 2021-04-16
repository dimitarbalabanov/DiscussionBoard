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
               .Property(p => p.Title)
               .IsRequired()
               .HasMaxLength(300);

            post
               .Property(p => p.Content)
               .HasMaxLength(2500);

            post
                .HasOne(p => p.Creator)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.CreatorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            post
                .HasOne(p => p.Forum)
                .WithMany(f => f.Posts)
                .HasForeignKey(p => p.ForumId);

            post
                .HasOne(p => p.Media)
                .WithOne(pm => pm.Post)
                .HasForeignKey<PostMedia>(pm => pm.PostId);

            post
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            post
                .HasMany(p => p.Votes)
                .WithOne(pv => pv.Post)
                .HasForeignKey(pv => pv.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            post
                .HasMany(p => p.Reports)
                .WithOne(pv => pv.Post)
                .HasForeignKey(pv => pv.PostId)
                .OnDelete(DeleteBehavior.NoAction);

            post.HasIndex(p => p.CreatedOn);
            post.HasIndex(p => p.VotesScore);
        }
    }
}
