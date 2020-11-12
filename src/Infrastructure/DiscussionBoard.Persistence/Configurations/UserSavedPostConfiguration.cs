using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class UserSavedPostConfiguration : IEntityTypeConfiguration<UserPostSave>
    {
        public void Configure(EntityTypeBuilder<UserPostSave> userPostSave)
        {
            userPostSave
                .HasKey(ups => new { ups.UserId, ups.PostId });

            userPostSave
                .HasOne(ups => ups.User)
                .WithMany(u => u.PostSaves)
                .HasForeignKey(ups => ups.UserId);

            userPostSave
                .HasOne(ups => ups.Post)
                .WithMany(p => p.UserSaves)
                .HasForeignKey(ups => ups.PostId);
        }
    }
}
