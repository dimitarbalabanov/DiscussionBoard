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
               .Property(cv => cv.Type)
               .IsRequired();

            commentVote
                .HasOne(cv => cv.Creator)
                .WithMany(u => u.CommentVotes)
                .HasForeignKey(cv => cv.CreatorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            commentVote
                .HasOne(cv => cv.Comment)
                .WithMany(c => c.Votes)
                .HasForeignKey(cv => cv.CommentId);
        }
    }
}
