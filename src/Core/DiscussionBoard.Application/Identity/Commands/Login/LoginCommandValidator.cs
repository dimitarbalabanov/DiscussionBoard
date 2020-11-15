using FluentValidation;

namespace DiscussionBoard.Application.Identity.Commands.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(c => c.Email)
                .NotEmpty()
                .WithMessage("Email cannot be empty");

            RuleFor(c => c.Password)
                .NotEmpty()
                .WithMessage("Password cannot be empty");
        }
    }
}
