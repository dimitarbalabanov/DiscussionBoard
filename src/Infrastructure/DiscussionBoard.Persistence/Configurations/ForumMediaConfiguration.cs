using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Persistence.Configurations
{
    public class ForumMediaConfiguration : IEntityTypeConfiguration<ForumMedia>
    {
        public void Configure(EntityTypeBuilder<ForumMedia> forumMedia)
        {
            forumMedia
               .Property(fm => fm.Url)
               .IsRequired()
               .HasMaxLength(200);

            forumMedia
               .Property(fm => fm.PublicId)
               .IsRequired()
               .HasMaxLength(200);

            forumMedia
                .HasOne(fm => fm.Forum)
                .WithOne(f => f.Image)
                .HasForeignKey<ForumMedia>(fm => fm.ForumId);
        }
    }
}
