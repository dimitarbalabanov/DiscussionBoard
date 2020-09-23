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
               .Length(ContentMinLength, ContentMaxLength)
               .WithMessage(string.Format(ErrorMsg, ContentMinLength, ContentMaxLength));
        }
    }
}
