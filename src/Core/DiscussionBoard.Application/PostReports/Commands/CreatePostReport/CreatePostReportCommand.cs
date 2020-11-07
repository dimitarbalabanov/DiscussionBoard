using MediatR;

namespace DiscussionBoard.Application.PostReports.Commands.CreatePostReport
{
    public class CreatePostReportCommand : IRequest<CreatePostReportCommandResponse>
    {
        public int PostId { get; set; }

        public string Type { get; set; }

        public int? RuleId { get; set; }
    }
}
