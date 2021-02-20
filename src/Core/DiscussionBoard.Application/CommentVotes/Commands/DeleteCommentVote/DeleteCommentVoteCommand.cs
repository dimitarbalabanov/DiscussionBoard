using MediatR;

namespace DiscussionBoard.Application.CommentVotes.Commands.DeleteCommentVote
{
    public class DeleteCommentVoteCommand : IRequest
    {
        public int Id { get; set; }
    }
}
