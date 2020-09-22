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
                .Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)
                .WithMessage(string.Format(TITLE_ERROR_MSG, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH));

            RuleFor(p => p.Content)
                .NotEmpty()
                .Length(CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH)
                .WithMessage(string.Format(CONTENT_ERROR_MSG, CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH));
        }
    }
}
