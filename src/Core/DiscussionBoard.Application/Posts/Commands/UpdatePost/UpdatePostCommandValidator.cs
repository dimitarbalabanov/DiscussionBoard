using DiscussionBoard.Application.Common.CustomValidators;
using DiscussionBoard.Application.Posts.Commands.Validator;
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

            RuleFor(p => p.PostMedia)
               .IsValidTypeAndSize();
        }
    }
}
