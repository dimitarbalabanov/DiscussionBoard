using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using MediatR;

namespace DiscussionBoard.Application.CommentVotes.Commands.CreateCommentVote
{
    public class CreateCommentVoteCommand : IRequest<CreateCommentVoteCommandResponse>, IMapTo<CommentVote>
    {
        public string Type { get; set; }

        public int CommentId { get; set; }
    }
}
