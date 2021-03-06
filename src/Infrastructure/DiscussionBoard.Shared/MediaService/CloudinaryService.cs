﻿using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DiscussionBoard.Application.Common.DTOs;
using DiscussionBoard.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DiscussionBoard.Shared.MediaService
{
    public class CloudinaryService : IMediaService
    {
        private const string JpgFormat = "jpg";
        private const string PngFormat = "png";

        private readonly Cloudinary _cloudinary;

        public CloudinaryService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        public async Task<UploadResultDto> UploadImageAsync(IFormFile formFile)
        {
            if (formFile == null)
            {
                throw new ArgumentNullException(nameof(formFile));
            }

            var memoryStream = new MemoryStream();
            await formFile.CopyToAsync(memoryStream);
            byte[] image = memoryStream.ToArray();
            memoryStream.Dispose();

            var trustedFileName = Path.GetRandomFileName();
            var stream = new MemoryStream(image);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(trustedFileName, stream),
                AllowedFormats = new string[] { JpgFormat, PngFormat },
            };
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            stream.Dispose();

            var result = new UploadResultDto
            {
                AbsoluteUri = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
            };
            return result;
        }

        public async Task DestroyImageAsync(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);
            await _cloudinary.DestroyAsync(deletionParams);
        }
    }
}
