using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class UserCommentVoteConfiguration : IEntityTypeConfiguration<UserCommentVote>
    {
        public void Configure(EntityTypeBuilder<UserCommentVote> userCommentVote)
        {
            userCommentVote
                .Property(ucv => ucv.Type)
                .IsRequired();

            userCommentVote
                .HasKey(ucv => new { ucv.CreatorId, ucv.CommentId });

            userCommentVote
                .HasOne(ucv => ucv.Creator)
                .WithMany(u => u.CommentVotes)
                .HasForeignKey(ucv => ucv.CreatorId);

            userCommentVote
                .HasOne(ucv => ucv.Comment)
                .WithMany(c => c.Votes)
                .HasForeignKey(ucv => ucv.CommentId);
        }
    }
}
