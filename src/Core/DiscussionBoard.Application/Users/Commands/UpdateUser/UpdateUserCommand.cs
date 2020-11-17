using MediatR;
using Microsoft.AspNetCore.Http;

namespace DiscussionBoard.Application.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : IRequest
    {
        public string Bio { get; set; }

        public IFormFile MediaFile { get; set; }
    }
}
