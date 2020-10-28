using MediatR;

namespace DiscussionBoard.Application.UserPostVotes.Commands.DeleteUserPostVote
{
    public class DeleteUserPostVoteCommand : IRequest
    {
        public int PostId { get; set; }
    }
}
