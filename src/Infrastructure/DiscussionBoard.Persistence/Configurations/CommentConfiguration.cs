using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> comment)
        {
            comment
               .Property(x => x.Content)
               .IsRequired()
               .HasMaxLength(2000);

            comment
                .HasOne(x => x.Creator)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.CreatorId);

            comment
                .HasOne(x => x.Post)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.PostId);

            comment
                .HasMany(x => x.Votes)
                .WithOne(x => x.Comment)
                .HasForeignKey(x => x.CommentId);
        }
    }
}
