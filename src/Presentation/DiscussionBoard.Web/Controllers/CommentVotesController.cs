using DiscussionBoard.Application.UserCommentVotes.Commands.CreateUserCommentVote;
using DiscussionBoard.Application.UserCommentVotes.Commands.DeleteUserCommentVote;
using DiscussionBoard.Application.UserCommentVotes.Commands.UpdateUserCommentVote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class CommentVotesController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserCommentVoteCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserCommentVoteCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteUserCommentVoteCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
