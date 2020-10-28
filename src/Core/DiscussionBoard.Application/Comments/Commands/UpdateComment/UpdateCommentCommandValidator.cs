using DiscussionBoard.Application.Comments.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommandValidator : AbstractValidator<UpdateCommentCommand>
    {
        public UpdateCommentCommandValidator()
        {
            RuleFor(p => p.Content)
               .IsContentProperLength();
        }
    }
}
