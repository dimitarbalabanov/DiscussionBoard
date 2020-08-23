using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> applicationUser)
        {
            applicationUser
                .Property(x => x.Bio)
                .HasMaxLength(200);

            applicationUser
                .Property(x => x.AvatarUrl)
                .HasMaxLength(200);

            applicationUser
                .HasMany(x => x.Posts)
                .WithOne()
                .HasForeignKey(x => x.CreatorId);

            applicationUser
                .HasMany(x => x.Comments)
                .WithOne()
                .HasForeignKey(x => x.CreatorId);
        }
    }
}
