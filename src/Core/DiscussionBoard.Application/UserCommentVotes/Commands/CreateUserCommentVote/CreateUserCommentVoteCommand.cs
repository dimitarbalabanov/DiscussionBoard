using MediatR;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.CreateUserCommentVote
{
    public class CreateUserCommentVoteCommand : IRequest
    {
        public string Type { get; set; }

        public int CommentId { get; set; }
    }
}
