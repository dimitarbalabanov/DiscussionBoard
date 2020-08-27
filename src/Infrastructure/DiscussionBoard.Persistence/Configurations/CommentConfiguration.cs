﻿using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DiscussionBoard.Persistence.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> comment)
        {
            comment
               .Property(c => c.Content)
               .IsRequired()
               .HasMaxLength(2000);

            comment
                .HasOne(c => c.Creator)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.CreatorId);

            comment
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId);

            comment
                .HasMany(c => c.Votes)
                .WithOne(v => v.Comment)
                .HasForeignKey(v => v.CommentId);
        }
    }
}
