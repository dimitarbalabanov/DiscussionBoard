using CloudinaryDotNet;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Shared.MediaService;
using DiscussionBoard.Shared.MessagingService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DiscussionBoard.Shared
{
    public static class ServiceRegistrationExtension
    {
        public static void AddShared(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(x => new Cloudinary(
                new Account(configuration["Cloudinary:CloudName"], configuration["Cloudinary:ApiKey"], configuration["Cloudinary:ApiSecret"])));
            services.AddTransient<IMediaService, CloudinaryService>();
            services.AddTransient<IEmailSender>(x => new SendGridEmailSender(configuration["SendGridSettings:ApiKey"]));
        }
    }
}
