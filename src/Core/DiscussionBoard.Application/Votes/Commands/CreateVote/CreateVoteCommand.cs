using MediatR;

namespace DiscussionBoard.Application.Votes.Commands.CreateVote
{
    public class CreateVoteCommand : IRequest<int>
    {
        public string Type { get; set; }

        public int CommentId { get; set; }

        public string CreatorId { get; set; }
    }
}
