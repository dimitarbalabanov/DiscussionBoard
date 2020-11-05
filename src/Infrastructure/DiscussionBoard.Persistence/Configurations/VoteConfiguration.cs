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
                .Property(v => v.Type)
                .IsRequired();

            vote
                .HasOne(v => v.Creator)
                .WithMany(c => c.Votes)
                .HasForeignKey(v => v.CreatorId);
        }
    }
}
