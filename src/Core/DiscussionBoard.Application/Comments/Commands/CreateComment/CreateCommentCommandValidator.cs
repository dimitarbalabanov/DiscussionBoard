using DiscussionBoard.Application.Comments.Commands.Validators;
using FluentValidation;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentCommandValidator()
        {
            RuleFor(p => p.Content)
               .IsContentProperLength();

            RuleFor(p => p.PostId)
                .NotEmpty();
        }
    }
}
