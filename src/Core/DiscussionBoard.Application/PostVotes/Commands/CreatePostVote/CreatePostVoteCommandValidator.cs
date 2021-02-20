using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.PostVotes.Commands.CreatePostVote
{
    public class CreatePostVoteCommandValidator : AbstractValidator<CreatePostVoteCommand>
    {
        public CreatePostVoteCommandValidator()
        {
            RuleFor(p => p.Type)
                .IsValidVoteTypeEnum();

            RuleFor(p => p.PostId)
               .NotEmpty();
        }
    }
}
