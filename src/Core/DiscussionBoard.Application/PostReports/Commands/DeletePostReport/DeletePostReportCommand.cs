using MediatR;

namespace DiscussionBoard.Application.PostReports.Commands.DeletePostReport
{
    public class DeletePostReportCommand : IRequest
    {
        public string PostReportId { get; set; }
    }
}
