using FluentValidation;
using static DiscussionBoard.Application.Posts.Commands.ValidatorConstants;

namespace DiscussionBoard.Application.Posts.Commands.UpdatePost
{
    public class UpdatePostCommandValidator : AbstractValidator<UpdatePostCommand>
    {
        public UpdatePostCommandValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty()
                .Length(TitleMinLength, TitleMaxLength)
                .WithMessage("{PropertyName}" + string.Format(ErrorMsg, TitleMinLength, TitleMaxLength));

            RuleFor(p => p.Content)
                .NotEmpty()
                .Length(TitleMinLength, TitleMaxLength)
                .WithMessage("{PropertyName}" + string.Format(ErrorMsg, TitleMinLength, TitleMaxLength));

            RuleFor(p => p.CreatorId)
                .NotEmpty();
        }
    }
}
