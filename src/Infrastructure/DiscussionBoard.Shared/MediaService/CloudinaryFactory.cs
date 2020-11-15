using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;

namespace DiscussionBoard.Shared.MediaService
{
    public class CloudinaryFactory
    {
        public static Cloudinary GetInstance(IConfiguration configuration)
        {
            var cloud = configuration["Cloudinary:CloudName"];
            var apiKey = configuration["Cloudinary:ApiKey"];
            var apiSecret = configuration["Cloudinary:ApiSecret"];

            var account = new Account(cloud, apiKey, apiSecret);
            var instance = new Cloudinary(account);
            return instance;
        }
    }
}
