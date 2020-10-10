using MediatR;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQuery : IRequest<GetAllCommentsVm>
    {
        public int? PostId { get; set; }
    }
}
