using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> post)
        {
            post
               .Property(p => p.Title)
               .IsRequired()
               .HasMaxLength(200);

            post
               .Property(p => p.Content)
               .IsRequired()
               .HasMaxLength(2500);

            post
                .HasOne(p => p.Creator)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.CreatorId);

            post
                .HasOne(p => p.Forum)
                .WithMany(f => f.Posts)
                .HasForeignKey(p => p.ForumId);

            post
                .HasOne(p => p.PostMedia)
                .WithOne(pm => pm.Post)
                .HasForeignKey<PostMedia>(pm => pm.PostId);

            post
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostId);

            post
                .HasMany(p => p.Votes)
                .WithOne(pv => pv.Post)
                .HasForeignKey(pv => pv.PostId);

            post
                .HasMany(p => p.Reports)
                .WithOne(pv => pv.Post)
                .HasForeignKey(pv => pv.PostId);

            //post.Property(p => p.Score)
            //    .HasComputedColumnSql();

            //SELECT SUM(CAST([v].[Type] AS int))
            //FROM [PostsVotes] AS [p]
            //INNER JOIN [Votes] AS [v] ON[p].[VoteId] = [v].[Id]
            //WHERE [p0].[Id] = [p].[PostId]
        }
    }
}
