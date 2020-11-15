using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.ConfirmEmail
{
    public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, string>
    {
        private readonly IIdentityService _identityService;

        public ConfirmEmailCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<string> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.ConfirmEmailAsync(request.UserId, request.Code);
            if (!result.Succeeded)
            {
                throw new AuthRequestException(result.Error);
            }

            return "Email confirmed";
        }
    }
}
