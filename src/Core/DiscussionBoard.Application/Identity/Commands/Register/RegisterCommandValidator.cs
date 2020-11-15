using FluentValidation;

namespace DiscussionBoard.Application.Identity.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(c => c.Email)
                .NotEmpty()
                .WithMessage("Email cannot be empty");

            RuleFor(c => c.UserName)
                .NotEmpty()
                .WithMessage("Username cannot be empty");

            RuleFor(c => c.Password)
                .NotEmpty()
                .WithMessage("Password cannot be empty");

            RuleFor(c => c.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Confirm password cannot be empty");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password)
                .WithMessage("Passwords do not match");
        }
    }
}
