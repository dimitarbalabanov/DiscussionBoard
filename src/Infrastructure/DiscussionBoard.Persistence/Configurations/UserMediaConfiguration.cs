using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    class UserMediaConfiguration : IEntityTypeConfiguration<UserMedia>
    {
        public void Configure(EntityTypeBuilder<UserMedia> userMedia)
        {
            userMedia
               .Property(um => um.Url)
               .IsRequired()
               .HasMaxLength(200);

            userMedia
               .Property(um => um.PublicId)
               .IsRequired()
               .HasMaxLength(200);

            userMedia
                .HasOne(um => um.User)
                .WithOne(u => u.Media)
                .HasForeignKey<UserMedia>(um => um.UserId)
                .IsRequired();
        }
    }
}
