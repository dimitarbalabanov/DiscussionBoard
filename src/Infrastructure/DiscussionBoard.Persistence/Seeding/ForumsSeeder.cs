using DiscussionBoard.Application.Interfaces;
using DiscussionBoard.Domain.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class ForumsSeeder : IDbContextSeeder
    {
        public async Task SeedAsync(IApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Forums.Any())
            {
                return;
            }

            var forums = new Forum[]
            {
                new Forum
                { 
                    Title = "Movies",
                    Description = "Anything about movies"
                },
                new Forum
                {
                    Title = "Music",
                    Description = "Anything about music"
                },
                new Forum
                {
                    Title = "Programming",
                    Description = "Anything about Programming"
                }
            };

            await dbContext.Forums.AddRangeAsync(forums);
        }
    }
}
