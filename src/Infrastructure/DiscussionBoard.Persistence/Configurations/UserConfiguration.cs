using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> user)
        {
            user
                .Property(u => u.Bio)
                .HasMaxLength(200);

            user
                .HasMany(u => u.Posts)
                .WithOne(p => p.Creator)
                .HasForeignKey(p => p.CreatorId);

            user
                .HasMany(u => u.Comments)
                .WithOne(c => c.Creator)
                .HasForeignKey(c => c.CreatorId);

            user
                .HasMany(u => u.Votes)
                .WithOne(v => v.Creator)
                .HasForeignKey(v => v.CreatorId);
        }
    }
}
