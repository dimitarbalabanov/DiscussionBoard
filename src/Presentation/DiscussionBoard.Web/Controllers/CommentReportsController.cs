using DiscussionBoard.Application.CommentReports.Commands.CreateCommentReport;
using DiscussionBoard.Application.CommentReports.Commands.DeleteCommentReport;
using DiscussionBoard.Application.CommentReports.Commands.UpdateCommentReport;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class CommentReportsController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommentReportCommand command)
        {
            var id = await Mediator.Send(command);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdateCommentReportCommand command)
        {
            command.CommentReportId = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            await Mediator.Send(new DeleteCommentReportCommand { CommentReportId = id });
            return NoContent();
        }
    }
}
