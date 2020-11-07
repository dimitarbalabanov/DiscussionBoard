using MediatR;

namespace DiscussionBoard.Application.PostReports.Commands.UpdatePostReport
{
    public class UpdatePostReportCommand : IRequest
    {
        public string PostReportId { get; set; }
    }
}
