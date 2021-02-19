using DiscussionBoard.Application.Forums.Commands.CreateForum;
using DiscussionBoard.Application.Forums.Commands.DeleteForum;
using DiscussionBoard.Application.Forums.Commands.UpdateForum;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using DiscussionBoard.Web.ModelBinders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class ForumsController : BaseController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var response = await Mediator.Send(new GetAllForumsQuery());
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync([FromRoute] int id)
        {
            var response = await Mediator.Send(new GetForumByIdQuery(id));
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateForumCommand command)
        {
            var response = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetAsync), new { id = response.Id }, response);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromForm] UpdateForumCommand command)
        {
            //command.ForumId = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            await Mediator.Send(new DeleteForumCommand { ForumId = id });
            return NoContent();
        }
    }
}
