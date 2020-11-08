using Microsoft.Extensions.Configuration;

namespace DiscussionBoard.Shared.Cloudinary
{
    public class CloudinaryFactory
    {
        public static CloudinaryDotNet.Cloudinary GetInstance(IConfiguration configuration)
        {
            var cloud = configuration["Cloudinary:CloudName"];
            var apiKey = configuration["Cloudinary:ApiKey"];
            var apiSecret = configuration["Cloudinary:ApiSecret"];

            var account = new CloudinaryDotNet.Account(cloud, apiKey, apiSecret);
            var instance = new CloudinaryDotNet.Cloudinary(account);
            return instance;
        }
    }
}
