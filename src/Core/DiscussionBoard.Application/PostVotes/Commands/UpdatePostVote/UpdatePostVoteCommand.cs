using MediatR;

namespace DiscussionBoard.Application.PostVotes.Commands.UpdatePostVote
{
    public class UpdatePostVoteCommand : IRequest
    {
        public int Id { get; set; }

        public string Type { get; set; }
    }
}
