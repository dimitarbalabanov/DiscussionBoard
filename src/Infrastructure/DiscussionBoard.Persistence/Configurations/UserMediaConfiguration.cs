using DiscussionBoard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Persistence.Configurations
{
    class UserMediaConfiguration : IEntityTypeConfiguration<UserMedia>
    {
        public void Configure(EntityTypeBuilder<UserMedia> userMedia)
        {
            userMedia
               .Property(um => um.Url)
               .IsRequired()
               .HasMaxLength(200);

            userMedia
               .Property(um => um.PublicId)
               .IsRequired()
               .HasMaxLength(200);

            userMedia
                .HasOne(um => um.User)
                .WithOne(u => u.UserMedia)
                .HasForeignKey<UserMedia>(um => um.UserId);
        }
    }
}
