using DiscussionBoard.Application.Common.CustomValidators;
using DiscussionBoard.Application.Forums.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommandValidator : AbstractValidator<CreateForumCommand>
    {
        public CreateForumCommandValidator()
        {
            RuleFor(f => f.Title)
                .IsTitleProperLength();

            RuleFor(f => f.Subtitle)
                    .IsSubtitleProperLength();

            RuleFor(f => f.Description)
                    .IsDescriptionProperLength();

            RuleFor(f => f.ForumMedia)
                    .IsValidTypeAndSize();
        }
    }
}
