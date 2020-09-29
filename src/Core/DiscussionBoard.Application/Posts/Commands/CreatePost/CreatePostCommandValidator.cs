using FluentValidation;
using static DiscussionBoard.Application.Posts.Commands.ValidatorConstants;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandValidator : AbstractValidator<CreatePostCommand> 
    {
        public CreatePostCommandValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty()
                .Length(TitleMinLength, TitleMaxLength)
                .WithMessage(string.Format(ErrorMsg, TitleMinLength, TitleMaxLength));

            RuleFor(p => p.Content)
                .NotEmpty()
                .Length(ContentMinLength, ContentMaxLength)
                .WithMessage(string.Format(ErrorMsg, ContentMinLength, ContentMaxLength));

            RuleFor(p => p.ForumId)
                .NotEmpty();
        }
    }
}
