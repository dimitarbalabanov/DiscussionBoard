using CloudinaryDotNet;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Settings;
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
            var cloudinarySettings = new CloudinarySettings();
            configuration.Bind(nameof(cloudinarySettings), cloudinarySettings);
            services.AddSingleton(x => new Cloudinary(
                new Account(cloudinarySettings.CloudName, cloudinarySettings.ApiKey, cloudinarySettings.ApiSecret)));
            services.AddTransient<IMediaService, CloudinaryService>();

            var sendGridSettings = new SendGridSettings();
            configuration.Bind(nameof(sendGridSettings), sendGridSettings);
            services.AddTransient<IEmailSender>(x => new SendGridEmailSender(sendGridSettings.ApiKey));
        }
    }
}
