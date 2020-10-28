using MediatR;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQuery : IRequest<GetAllCommentsResponse>
    {
        public int? PostId { get; set; }
    }
}
