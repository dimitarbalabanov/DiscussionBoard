using DiscussionBoard.Application.PostVotes.Commands.CreatePostVote;
using DiscussionBoard.Application.PostVotes.Commands.DeletePostVote;
using DiscussionBoard.Application.PostVotes.Commands.UpdatePostVote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class PostVotesController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreatePostVoteCommand command)
        {
            var id = await Mediator.Send(command);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] UpdatePostVoteCommand command)
        {
            command.Id = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            await Mediator.Send(new DeletePostVoteCommand { Id = id });
            return NoContent();
        }
    }
}
