using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, RegisterResponse>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<RegisterResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var sameEmailUser = await _userManager.FindByEmailAsync(request.Email);
            if (sameEmailUser != null)
            {
                return new RegisterResponse
                {
                    Errors = new[] { "User with this email address already exists" }
                };
            }

            var sameUsernameUser = await _userManager.FindByNameAsync(request.UserName);
            if (sameUsernameUser != null)
            {
                return new RegisterResponse
                {
                    Errors = new[] { "User with this username already exists" }
                };
            }

            var newUser = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                UserName = request.UserName
            };

            var createdUser = await _userManager.CreateAsync(newUser, request.Password);
            if (!createdUser.Succeeded)
            {
                return new RegisterResponse
                {
                    Errors = createdUser.Errors.Select(e => e.Description)
                };
            }

            return new RegisterResponse { Success = true };
        }
    }
}
