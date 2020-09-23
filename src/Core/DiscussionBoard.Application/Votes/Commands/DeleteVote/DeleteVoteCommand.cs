using MediatR;

namespace DiscussionBoard.Application.Votes.Commands.DeleteVote
{
    public class DeleteVoteCommand : IRequest
    {
        public int Id { get; set; }

        public string CreatorId { get; set; }
    }
}
