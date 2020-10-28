using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandResponse : IMapFrom<Comment>
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
