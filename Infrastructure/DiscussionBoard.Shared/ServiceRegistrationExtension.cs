using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Shared.Cloudinary;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DiscussionBoard.Shared
{
    public static class ServiceRegistrationExtension
    {
        public static void AddCloudinary(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddSingleton(CloudinaryFactory.GetInstance(_config));
            //services.AddTransient<IMediaService, CloudinaryService>();
            services.AddSingleton<CloudinaryDotNet.Cloudinary>(x => CloudinaryFactory.GetInstance(configuration));
            services.AddTransient<IMediaService, CloudinaryService>();
        }
    }
}
