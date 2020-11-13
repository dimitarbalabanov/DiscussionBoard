using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class PostVoteConfiguration : IEntityTypeConfiguration<PostVote>
    {
        public void Configure(EntityTypeBuilder<PostVote> postVote)
        {
            postVote
               .Property(pv => pv.Type)
               .IsRequired();

            postVote
                .HasOne(pv => pv.Creator)
                .WithMany(u => u.PostVotes)
                .HasForeignKey(pv => pv.CreatorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            postVote
                .HasOne(pv => pv.Post)
                .WithMany(p => p.Votes)
                .HasForeignKey(pv => pv.PostId);
        }
    }
}
