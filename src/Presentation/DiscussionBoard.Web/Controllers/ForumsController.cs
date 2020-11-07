using DiscussionBoard.Application.Forums.Commands.CreateForum;
using DiscussionBoard.Application.Forums.Commands.DeleteForum;
using DiscussionBoard.Application.Forums.Commands.UpdateForum;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    public class ForumsController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await Mediator.Send(new GetAllForumsQuery());
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var response = await Mediator.Send(new GetForumByIdQuery { Id = id });
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateForumCommand command)
        {
            var response = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { response }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateForumCommand command)
        {
            command.ForumId = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await Mediator.Send(new DeleteForumCommand { ForumId = id });
            return NoContent();
        }
    }
}
