using MediatR;

namespace DiscussionBoard.Application.UserPostVotes.Commands.CreateUserPostVote
{
    public class CreateUserPostVoteCommand : IRequest
    {
        public string Type { get; set; }

        public int PostId { get; set; }
    }
}
