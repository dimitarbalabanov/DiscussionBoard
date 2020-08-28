using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Votes.Commands.CreateVote;
using DiscussionBoard.Application.Votes.Commands.DeleteVote;
using DiscussionBoard.Application.Votes.Commands.UpdateVote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class VotesController : BaseController
    {
        private readonly IAuthenticatedUserService _authUserService;

        public VotesController(IAuthenticatedUserService authUserService)
        {
            _authUserService = authUserService;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVoteCommand command)
        {
            command.CreatorId = _authUserService.UserId;
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateVoteCommand command)
        {
            command.Id = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteVoteCommand { Id = id });
            return NoContent();
        }
    }
}
