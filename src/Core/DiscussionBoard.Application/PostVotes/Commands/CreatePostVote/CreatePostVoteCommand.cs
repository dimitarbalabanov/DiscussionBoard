using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using MediatR;

namespace DiscussionBoard.Application.PostVotes.Commands.CreatePostVote
{
    public class CreatePostVoteCommand : IRequest<CreatePostVoteCommandResponse>, IMapTo<PostVote>
    {
        public string Type { get; set; }

        public int PostId { get; set; }
    }
}
