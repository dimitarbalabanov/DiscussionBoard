using DiscussionBoard.Application.Common.CustomValidators;
using FluentValidation;

namespace DiscussionBoard.Application.CommentVotes.Commands.CreateCommentVote
{
    public class CreateCommentVoteCommandValidator : AbstractValidator<CreateCommentVoteCommand>
    {
        public CreateCommentVoteCommandValidator()
        {
            RuleFor(p => p.Type)
                .IsValidVoteTypeEnum();

            RuleFor(p => p.CommentId)
               .NotEmpty();
        }
    }
}
