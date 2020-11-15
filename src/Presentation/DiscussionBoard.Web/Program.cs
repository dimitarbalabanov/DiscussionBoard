//using DiscussionBoard.Persistence;
//using DiscussionBoard.Persistence.Seeding;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace DiscussionBoard.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            //using (var scope = host.Services.CreateScope())
            //{
            //    var serviceScope = scope.ServiceProvider;

            //    try
            //    {
            //        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            //        dbContext.Database.Migrate();
            //        var seeder = scope.ServiceProvider.GetRequiredService<IDbContextSeeder>();
            //        seeder.SeedAsync(dbContext, scope.ServiceProvider).GetAwaiter().GetResult();
            //    }
            //    catch (Exception ex)
            //    {
            //        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            //        logger.LogError(ex, "An error occurred while migrating or initializing the database.");
            //    }
            //}

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
