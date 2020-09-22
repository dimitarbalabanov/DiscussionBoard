using MediatR;

namespace DiscussionBoard.Application.Identity.Commands.Register
{
    public class RegisterCommand : IRequest<RegisterResponse>
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
