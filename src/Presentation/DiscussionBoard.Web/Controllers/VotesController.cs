using DiscussionBoard.Application.Votes.Commands.CreateVote;
using DiscussionBoard.Application.Votes.Commands.DeleteVote;
using DiscussionBoard.Application.Votes.Commands.UpdateVote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class VotesController : BaseController
    {
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVoteCommand command)
        {
            Thread.Sleep(300);

            var id = await Mediator.Send(command);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateVoteCommand command)
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

            await Mediator.Send(new DeleteVoteCommand { Id = id });

            return NoContent();
        }
    }
}
