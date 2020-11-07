using MediatR;

namespace DiscussionBoard.Application.CommentReports.Commands.DeleteCommentReport
{
    public class DeleteCommentReportCommand : IRequest
    {
        public string CommentReportId { get; set; }
    }
}
