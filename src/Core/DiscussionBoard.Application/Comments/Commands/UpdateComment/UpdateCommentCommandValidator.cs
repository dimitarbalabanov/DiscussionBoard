using FluentValidation;
using static DiscussionBoard.Application.Comments.Commands.ValidatorConstants;

namespace DiscussionBoard.Application.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommandValidator : AbstractValidator<UpdateCommentCommand>
    {
        public UpdateCommentCommandValidator()
        {
            RuleFor(p => p.Content)
               .NotEmpty()
               .Length(CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH)
               .WithMessage(string.Format(CONTENT_ERROR_MSG, CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH));
        }
    }
}
