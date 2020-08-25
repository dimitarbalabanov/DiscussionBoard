using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class VoteConfiguration : IEntityTypeConfiguration<Vote>
    {
        public void Configure(EntityTypeBuilder<Vote> vote)
        {
            vote
                .Property(x => x.Type)
                .IsRequired();

            vote
                .HasOne(x => x.Comment)
                .WithMany(x => x.Votes)
                .HasForeignKey(x => x.CommentId);

            vote
                .HasOne(x => x.Creator)
                .WithMany(x => x.Votes)
                .HasForeignKey(x => x.CreatorId);
        }
    }
}
