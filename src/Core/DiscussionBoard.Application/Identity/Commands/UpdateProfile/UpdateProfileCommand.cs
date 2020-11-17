using MediatR;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Identity.Commands.UpdateProfile
{
    class UpdateProfileCommand : IRequest
    {
        public string Bio { get; set; }

        public IFormFile MediaFile { get; set; }
    }
}
