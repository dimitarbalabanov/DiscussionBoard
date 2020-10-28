using DiscussionBoard.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        private readonly UserManager<User> _userManager;

        public RegisterCommandValidator(UserManager<User> userManager)
        {
            _userManager = userManager;

            RuleFor(c => c.Email)
                .MustAsync(IsUniqueEmail)
                .WithMessage("User with this email address already exists");

            RuleFor(c => c.UserName)
                .MustAsync(IsUniqueUsername)
                .WithMessage("User with this username already exists");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password)
                .WithMessage("Passwords do not match");
        }

        private async Task<bool> IsUniqueEmail(string email, CancellationToken cancellationToken)
        {
            return await _userManager.FindByEmailAsync(email) == null;
        }

        private async Task<bool> IsUniqueUsername(string username, CancellationToken cancellationToken)
        {
            return await _userManager.FindByNameAsync(username) == null;
        }
    }
}
