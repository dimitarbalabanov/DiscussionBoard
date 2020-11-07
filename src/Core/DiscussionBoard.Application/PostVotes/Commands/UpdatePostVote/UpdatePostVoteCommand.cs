using MediatR;

namespace DiscussionBoard.Application.PostVotes.Commands.UpdatePostVote
{
    public class UpdatePostVoteCommand : IRequest
    {
        public int PostVoteId { get; set; }

        public string Type { get; set; }
    }
}
