using DiscussionBoard.Application;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Persistence;
using DiscussionBoard.Web.Extensions;
using DiscussionBoard.Web.Hubs;
using DiscussionBoard.Web.Middlewares;
using DiscussionBoard.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DiscussionBoard.Shared;

namespace DiscussionBoard.Web
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPersistence(_configuration);
            services.AddApplication();
            services.AddCloudinary(_configuration);
            services.AddSwaggerExtension();
            //services.AddSignalR();
            services.AddControllersWithViews().AddNewtonsoftJson();
            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();

            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/build";
            //});
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<IApplicationDbContext>();
                var seeder = serviceScope.ServiceProvider.GetRequiredService<IDbContextSeeder>();
                seeder.SeedAsync(dbContext, serviceScope.ServiceProvider).GetAwaiter().GetResult();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //app.UseCustomExceptionHandler();
            app.UseMiddleware<TestSpinnerMiddleware>();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors(opt => opt.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwaggerExtension();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapHub<ChatHub>("/hubs/chat");
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseReactDevelopmentServer(npmScript: "start");
            //    }
            //});
        }
    }
}
