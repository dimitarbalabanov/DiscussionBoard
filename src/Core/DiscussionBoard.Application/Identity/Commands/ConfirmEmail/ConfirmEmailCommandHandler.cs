using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.ConfirmEmail
{
    public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, string>
    {
        private readonly UserManager<User> _userManager;

        public ConfirmEmailCommandHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
            {
                throw new NotFoundException(nameof(User));
            }
            if (await _userManager.IsEmailConfirmedAsync(user))
            {
                return "Already confirmed";
            }

            var result = await _userManager.ConfirmEmailAsync(user, request.Code);
            return result.Succeeded ? "Email confirmed" : "Error";
        }
    }
}
