using System;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Interfaces
{
    public interface IDbContextSeeder
    {
        Task SeedAsync(IApplicationDbContext dbContext, IServiceProvider serviceProvider);
    }
}
