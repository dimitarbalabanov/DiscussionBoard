using MediatR;

namespace DiscussionBoard.Application.Votes.Commands.CreateVote
{
    public class CreateVoteCommand : IRequest<int>
    {
        public string Type { get; set; }

        public int EntityId { get; set; }

        public string EntityType { get; set; }
    }
}
