using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class UserPostVoteConfiguration : IEntityTypeConfiguration<UserPostVote>
    {
        public void Configure(EntityTypeBuilder<UserPostVote> userPostVote)
        {
            userPostVote
                .Property(upv => upv.Type)
                .IsRequired();

            userPostVote
                .HasKey(upv => new { upv.CreatorId, upv.PostId });

            userPostVote
                .HasOne(upv => upv.Creator)
                .WithMany(u => u.PostVotes)
                .HasForeignKey(upv => upv.CreatorId);

            userPostVote
                .HasOne(upv => upv.Post)
                .WithMany(p => p.Votes)
                .HasForeignKey(upv => upv.PostId);
        }
    }
}
