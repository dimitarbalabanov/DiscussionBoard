using MediatR;

namespace DiscussionBoard.Application.CommentVotes.Commands.CreateCommentVote
{
    public class CreateCommentVoteCommand : IRequest<int>
    {
        public string Type { get; set; }

        public int CommentId { get; set; }
    }
}
