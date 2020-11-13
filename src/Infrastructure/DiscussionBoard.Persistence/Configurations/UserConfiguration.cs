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
               .HasOne(u => u.Media)
               .WithOne(um => um.User)
               .HasForeignKey<UserMedia>(um => um.UserId);

            user
                .HasMany(u => u.Posts)
                .WithOne(p => p.Creator)
                .HasForeignKey(p => p.CreatorId);

            user
                .HasMany(u => u.Comments)
                .WithOne(c => c.Creator)
                .HasForeignKey(c => c.CreatorId);

            user
                .HasMany(u => u.CreatedPostReports)
                .WithOne(v => v.Creator)
                .HasForeignKey(v => v.CreatorId);

            user
                .HasMany(u => u.ResolvedPostReports)
                .WithOne(v => v.Resolver)
                .HasForeignKey(v => v.ResolverId);

            user
                .HasMany(u => u.PostVotes)
                .WithOne(v => v.Creator)
                .HasForeignKey(v => v.CreatorId);

            user
                .HasMany(u => u.CreatedCommentReports)
                .WithOne(v => v.Creator)
                .HasForeignKey(v => v.CreatorId);

            user
                .HasMany(u => u.ResolvedCommentReports)
                .WithOne(v => v.Resolver)
                .HasForeignKey(v => v.ResolverId);

            user
                .HasMany(u => u.CommentVotes)
                .WithOne(v => v.Creator)
                .HasForeignKey(v => v.CreatorId);
        }
    }
}
