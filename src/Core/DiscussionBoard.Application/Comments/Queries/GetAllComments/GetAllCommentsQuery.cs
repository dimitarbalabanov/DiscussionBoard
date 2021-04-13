using MediatR;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQuery : IRequest<GetAllCommentsResponse>
    {
        public int PostId { get; set; }

        public string Sort { get; set; }

        public string Top { get; set; }

        public string Cursor { get; set; }
    }
}
