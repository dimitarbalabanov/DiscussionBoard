using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Application.PostVotes.Commands.CreatePostVote
{
    public class CreatePostVoteCommandResponse : IMapFrom<PostVote>
    {
        public int Id { get; set; }
    }
}
