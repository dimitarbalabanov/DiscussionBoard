using DiscussionBoard.Application.Interfaces;
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
        public async Task SeedAsync(IApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            await SeedAdminAsync(userManager, "Administrator");
        }

        private static async Task SeedAdminAsync(UserManager<ApplicationUser> userManager, string administratorRoleName)
        {
            var user = await userManager.FindByNameAsync("Administrator");
            if (user != null && (await userManager.IsInRoleAsync(user, "Administrator")))
            {
                return;
            }

            var admin = new ApplicationUser
            {
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
