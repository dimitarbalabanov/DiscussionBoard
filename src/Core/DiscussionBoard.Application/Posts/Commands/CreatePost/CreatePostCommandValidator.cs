using DiscussionBoard.Application.Posts.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandValidator : AbstractValidator<CreatePostCommand> 
    {
        public CreatePostCommandValidator()
        {
            RuleFor(p => p.Title)
                .IsTitleProperLength();

            RuleFor(p => p.Content)
                .IsContentProperLength();

            RuleFor(p => p.ForumId)
                .NotEmpty();
        }
    }
}
