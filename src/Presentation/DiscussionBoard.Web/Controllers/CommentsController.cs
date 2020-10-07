using DiscussionBoard.Application.Comments.Commands.CreateComment;
using DiscussionBoard.Application.Comments.Commands.DeleteComment;
using DiscussionBoard.Application.Comments.Commands.UpdateComment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class CommentsController : BaseController
    {

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommentCommand command)
        {
            Thread.Sleep(300);

            var id = await Mediator.Send(command);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCommentCommand command)
        {
            Thread.Sleep(300);

            command.Id = id;
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Thread.Sleep(300);

            await Mediator.Send(new DeleteCommentCommand { Id = id });

            return NoContent();
        }
    }
}
