using DiscussionBoard.Application.Comments.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentCommandValidator()
        {
            RuleFor(c => c.Content)
               .IsContentProperLength();

            RuleFor(c => c.PostId)
                .NotEmpty();
        }
    }
}
