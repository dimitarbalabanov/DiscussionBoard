using DiscussionBoard.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class AdministratorSeeder : IDbContextSeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            await SeedAdminAsync(userManager, "Administrator");
        }

        private static async Task SeedAdminAsync(UserManager<User> userManager, string administratorRoleName)
        {
            var user = await userManager.FindByNameAsync("Administrator");
            if (user != null && (await userManager.IsInRoleAsync(user, "Administrator")))
            {
                return;
            }

            var admin = new User
            {
                Id = "22c7b169-a2dd-4521-bac3-20366131bcb1",
                UserName = "Administrator",
                Email = "admin@admin.admin",
            };

            var result = await userManager.CreateAsync(admin, "Administrator");
            if (!result.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
            }

            var roleResult = await userManager.AddToRoleAsync(admin, administratorRoleName);
            if (!roleResult.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
            }
        }
    }
}
