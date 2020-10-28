using DiscussionBoard.Application.UserPostVotes.Commands.CreateUserPostVote;
using DiscussionBoard.Application.UserPostVotes.Commands.DeleteUserPostVote;
using DiscussionBoard.Application.UserPostVotes.Commands.UpdateUserPostVote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class PostVotesController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserPostVoteCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserPostVoteCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteUserPostVoteCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
