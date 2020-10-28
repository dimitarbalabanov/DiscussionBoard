using MediatR;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.UpdateUserCommentVote
{
    public class UpdateUserCommentVoteCommand : IRequest
    {
        public int CommentId { get; set; }

        public string Type { get; set; }
    }
}
