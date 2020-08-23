using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Interfaces
{
    public interface IDbContextSeeder
    {
        Task SeedAsync(IApplicationDbContext dbContext, IServiceProvider serviceProvider);
    }
}
