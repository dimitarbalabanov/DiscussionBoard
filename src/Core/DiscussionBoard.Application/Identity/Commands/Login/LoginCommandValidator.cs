using DiscussionBoard.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public LoginCommandValidator(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;

            //RuleFor(c => c.Email)
            //    .MustAsync(IsUniqueEmail)
            //    .WithMessage("User with this email address already exists");

            //RuleFor(c => c.UserName)
            //    .MustAsync(IsUniqueUsername)
            //    .WithMessage("User with this username already exists");
        }

        //private async Task<bool> IsEmailRegistered(string email, CancellationToken cancellationToken)
        //{
        //    return await _userManager.FindByEmailAsync(email) != null;
        //}

        //private async Task<bool> IsUniqueUsername(string username, CancellationToken cancellationToken)
        //{
        //    return await _userManager.FindByNameAsync(username) != null;
        //}
    }
}
