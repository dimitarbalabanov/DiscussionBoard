using System;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public interface IDbContextSeeder
    {
        Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider);
    }
}
