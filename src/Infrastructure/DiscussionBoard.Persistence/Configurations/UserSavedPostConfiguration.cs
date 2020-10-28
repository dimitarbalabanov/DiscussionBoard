using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class UserSavedPostConfiguration : IEntityTypeConfiguration<UserSavedPost>
    {
        public void Configure(EntityTypeBuilder<UserSavedPost> userSavedPost)
        {
            userSavedPost
                .HasKey(usp => new { usp.UserId, usp.PostId });

            userSavedPost
                .HasOne(usp => usp.User)
                .WithMany(u => u.SavedPosts)
                .HasForeignKey(usp => usp.UserId);

            userSavedPost
                .HasOne(usp => usp.Post)
                .WithMany(p => p.SavedBy)
                .HasForeignKey(usp => usp.PostId);
        }
    }
}
