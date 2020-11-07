using DiscussionBoard.Application.PostReports.Commands.CreatePostReport;
using DiscussionBoard.Application.PostReports.Commands.DeletePostReport;
using DiscussionBoard.Application.PostReports.Commands.UpdatePostReport;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class PostReportsController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePostReportCommand command)
        {
            var response = await Mediator.Send(command);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdatePostReportCommand command)
        {
            command.PostReportId = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            await Mediator.Send(new DeletePostReportCommand { PostReportId = id });
            return NoContent();
        }
    }
}
