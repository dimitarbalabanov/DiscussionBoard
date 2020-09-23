using MediatR;

namespace DiscussionBoard.Application.Votes.Commands.UpdateVote
{
    public class UpdateVoteCommand : IRequest
    {
        public int Id { get; set; }

        public string Type { get; set; }

        public string CreatorId { get; set; }
    }
}
