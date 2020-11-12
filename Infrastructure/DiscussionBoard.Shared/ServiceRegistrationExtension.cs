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
            services.AddSingleton(x => CloudinaryFactory.GetInstance(configuration));
            services.AddTransient<IMediaService, CloudinaryService>();
            services.AddTransient<IEmailSender>(x => new SendGridEmailSender(configuration["SendGridSettings:ApiKey"]));
            //var sendGridSettings = new SendGridSettings();
            //configuration.Bind(nameof(sendGridSettings), sendGridSettings);
            //services.AddSingleton(sendGridSettings);
            //services.AddSendGrid(options => { options.ApiKey = configuration["SendGridSettings:ApiKey"]; });
        }
    }
}
