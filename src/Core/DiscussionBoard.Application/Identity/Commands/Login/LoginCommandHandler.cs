using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponse>
    {
        private readonly IIdentityService _identityService;

        public LoginCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.LoginAsync(request.Email, request.Password);
            if (!result.Succeeded)
            {
                throw new AuthRequestException(result.Error);
            }

            return new LoginResponse
            {
                Token = result.Token,
                ExpiresAt = result.ExpiresAt,
                Username = result.UserName
            };
        }
    }
}
