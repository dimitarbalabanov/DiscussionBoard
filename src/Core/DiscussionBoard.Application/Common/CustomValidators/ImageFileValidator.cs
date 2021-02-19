using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Common.CustomValidators
{
    public static class ImageFileValidator
    {
        private const string InvalidFileExtensionErrorMessage = "Image can be .jpg, .jpeg or .png formats only.";
        private const string InvalidFileSizeErrorMessage = "Image size can be at most 1 MB.";

        private const string JpegMimeType = "image/jpeg";
        private const string PngMimeType = "image/png";

        private const int FileMaxSizeInBytes = 1048576;
        public static IRuleBuilderOptions<T, IFormFile> IsValidTypeAndSize<T>(this IRuleBuilder<T, IFormFile> rule)
        {
            return rule
                .Must(file => file == null || file.ContentType == JpegMimeType || file.ContentType == PngMimeType)
                .WithMessage(InvalidFileExtensionErrorMessage)
                .Must(file => file == null || file.Length <= FileMaxSizeInBytes)
                .WithMessage(InvalidFileSizeErrorMessage);
        }
    }
}
