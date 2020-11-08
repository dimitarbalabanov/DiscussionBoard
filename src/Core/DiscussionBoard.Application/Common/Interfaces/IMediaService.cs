using DiscussionBoard.Application.Common.DTOs;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Interfaces
{
    public interface IMediaService
    {
        Task<UploadResultDto> UploadImageAsync(IFormFile formFile, string name);

        Task DestroyImageAsync(string publicId);
    }
}
