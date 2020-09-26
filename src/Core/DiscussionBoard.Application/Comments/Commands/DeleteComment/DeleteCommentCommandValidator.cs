using FluentValidation;

namespace DiscussionBoard.Application.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommandValidator : AbstractValidator<DeleteCommentCommand>
    {
        public DeleteCommentCommandValidator()
        {
            RuleFor(c => c.Id)
                .NotEmpty();
        }
    }
}
