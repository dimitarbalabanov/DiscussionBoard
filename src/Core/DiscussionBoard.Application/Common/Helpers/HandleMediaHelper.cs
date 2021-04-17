using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Common;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class HandleMediaHelper
    {
        public static async Task<T> HandleMediaCreationAsync<T>(IFormFile mediaFile, IMediaService mediaService)
            where T : BaseMedia, new()
        {
            if (mediaFile != null)
            {
                var uploadResult = await mediaService.UploadImageAsync(mediaFile);
                var media = new T
                {
                    Url = uploadResult.AbsoluteUri,
                    PublicId = uploadResult.PublicId
                };

                return media;
            }

            return null;
        }
    }
}
