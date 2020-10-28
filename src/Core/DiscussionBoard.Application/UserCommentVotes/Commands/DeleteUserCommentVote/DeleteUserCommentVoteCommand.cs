using MediatR;

namespace DiscussionBoard.Application.UserCommentVotes.Commands.DeleteUserCommentVote
{
    public class DeleteUserCommentVoteCommand : IRequest
    {
        public int CommentId { get; set; }
    }
}
