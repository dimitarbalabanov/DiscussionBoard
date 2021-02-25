using DiscussionBoard.Application.Common.Responses;
using MediatR;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQuery : IRequest<PagedResponse<GetAllCommentsResponse>>
    {
        public int? PostId { get; set; }

        public string Sort { get; set; }

        public string Top { get; set; }

        public int? Cursor { get; set; }
    }
}
