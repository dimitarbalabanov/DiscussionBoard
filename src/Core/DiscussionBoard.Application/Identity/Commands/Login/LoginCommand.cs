using MediatR;

namespace DiscussionBoard.Application.Identity.Commands.Login
{
    public class LoginCommand : IRequest<LoginResponse>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
