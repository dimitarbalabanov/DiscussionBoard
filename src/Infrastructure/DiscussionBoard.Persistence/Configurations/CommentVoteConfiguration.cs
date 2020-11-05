using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class CommentVoteConfiguration : IEntityTypeConfiguration<CommentVote>
    {
        public void Configure(EntityTypeBuilder<CommentVote> commentVote)
        {
            commentVote
                .HasKey(cv => new { cv.CommentId, cv.VoteId });

            commentVote
                .HasOne(cv => cv.Vote)
                .WithMany(v => v.CommentsVotes)
                .HasForeignKey(cv => cv.VoteId);

            commentVote
                .HasOne(cv => cv.Comment)
                .WithMany(c => c.Votes)
                .HasForeignKey(cv => cv.CommentId);
        }
    }
}
