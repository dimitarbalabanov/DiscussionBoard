using MediatR;

namespace DiscussionBoard.Application.UserPostVotes.Commands.UpdateUserPostVote
{
    public class UpdateUserPostVoteCommand : IRequest
    {
        public int PostId { get; set; }

        public string Type { get; set; }
    }
}
