using DiscussionBoard.Application.Posts.Commands.CreatePost;
using FluentValidation;

namespace DiscussionBoard.Application.Posts.Commands.DeletePost
{
    public class DeletePostCommandValidator : AbstractValidator<DeletePostCommand>
    {
        public DeletePostCommandValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty();
        }
    }
}
