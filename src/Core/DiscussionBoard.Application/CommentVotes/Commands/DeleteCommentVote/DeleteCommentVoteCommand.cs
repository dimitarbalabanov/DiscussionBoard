using MediatR;

namespace DiscussionBoard.Application.CommentVotes.Commands.DeleteCommentVote
{
    public class DeleteCommentVoteCommand : IRequest
    {
        public int CommentVoteId { get; set; }
    }
}
