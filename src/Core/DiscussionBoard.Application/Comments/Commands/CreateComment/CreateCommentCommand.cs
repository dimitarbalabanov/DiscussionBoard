using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using MediatR;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommand : IRequest<CreateCommentCommandResponse>, IMapTo<Comment>
    {
        public string Content { get; set; }

        public int PostId { get; set; }
    }
}
