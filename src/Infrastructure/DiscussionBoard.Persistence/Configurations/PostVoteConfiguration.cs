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
                .HasKey(pv => new { pv.PostId, pv.VoteId });

            postVote
                .HasOne(pv => pv.Vote)
                .WithMany(v => v.PostsVotes)
                .HasForeignKey(pv => pv.VoteId);

            postVote
                .HasOne(pv => pv.Post)
                .WithMany(p => p.Votes)
                .HasForeignKey(pv => pv.PostId);
        }
    }
}
