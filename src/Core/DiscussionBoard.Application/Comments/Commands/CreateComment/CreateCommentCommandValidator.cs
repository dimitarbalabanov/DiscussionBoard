using FluentValidation;
using static DiscussionBoard.Application.Comments.Commands.ValidatorConstants;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentCommandValidator()
        {
            RuleFor(p => p.Content)
               .NotEmpty()
               .Length(ContentMinLength, ContentMaxLength)
               .WithMessage(string.Format(ErrorMsg, ContentMinLength, ContentMaxLength));

            RuleFor(p => p.PostId)
                .NotEmpty();
        }
    }
}
