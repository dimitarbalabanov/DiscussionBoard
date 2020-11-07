using MediatR;

namespace DiscussionBoard.Application.PostVotes.Commands.CreatePostVote
{
    public class CreatePostVoteCommand : IRequest<int>
    {
        public string Type { get; set; }

        public int PostId { get; set; }
    }
}
