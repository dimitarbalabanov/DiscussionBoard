using MediatR;

namespace DiscussionBoard.Application.PostVotes.Commands.DeletePostVote
{
    public class DeletePostVoteCommand : IRequest
    {
        public int PostVoteId { get; set; }
    }
}
