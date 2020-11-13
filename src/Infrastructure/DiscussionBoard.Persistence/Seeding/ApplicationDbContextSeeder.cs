using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class ApplicationDbContextSeeder : IDbContextSeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            if (serviceProvider == null)
            {
                throw new ArgumentNullException(nameof(serviceProvider));
            }

            var seeders = new List<IDbContextSeeder>
                          {
                              new RolesSeeder(),
                              new AdministratorSeeder(),
                              new UsersSeeder()
                          };

            foreach (var seeder in seeders)
            {
                await seeder.SeedAsync(dbContext, serviceProvider);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
