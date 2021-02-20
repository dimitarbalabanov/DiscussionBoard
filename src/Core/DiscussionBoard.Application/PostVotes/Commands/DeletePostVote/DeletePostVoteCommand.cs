using MediatR;

namespace DiscussionBoard.Application.PostVotes.Commands.DeletePostVote
{
    public class DeletePostVoteCommand : IRequest
    {
        public int Id { get; set; }
    }
}
