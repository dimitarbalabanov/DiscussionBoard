using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Application.CommentVotes.Commands.CreateCommentVote
{
    public class CreateCommentVoteCommandResponse : IMapFrom<Comment>
    {
        public int Id { get; set; }
    }
}
