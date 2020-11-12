using MediatR;

namespace DiscussionBoard.Application.Identity.Commands.ConfirmEmail
{
    public class ConfirmEmailCommand : IRequest<string>
    {
        public string UserId { get; set; }

        public string Code { get; set; }
    }
}
