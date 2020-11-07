using MediatR;

namespace DiscussionBoard.Application.CommentReports.Commands.CreateCommentReport
{
    public class CreateCommentReportCommand : IRequest<CreateCommentReportCommandResponse>
    {
        public int CommentId { get; set; }

        public string Type { get; set; }

        public int? RuleId { get; set; }
    }
}
