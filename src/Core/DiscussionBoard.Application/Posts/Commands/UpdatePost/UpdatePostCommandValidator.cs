using DiscussionBoard.Application.Posts.Commands.Validators;
using FluentValidation;

namespace DiscussionBoard.Application.Posts.Commands.UpdatePost
{
    public class UpdatePostCommandValidator : AbstractValidator<UpdatePostCommand>
    {
        public UpdatePostCommandValidator()
        {
            RuleFor(p => p.Title)
                .IsTitleProperLength();

            RuleFor(p => p.Content)
                .IsContentProperLength();
        }
    }
}
