using DiscussionBoard.Application.CommentVotes.Commands.CreateCommentVote;
using DiscussionBoard.Application.CommentVotes.Commands.DeleteCommentVote;
using DiscussionBoard.Application.CommentVotes.Commands.UpdateCommentVote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class CommentVotesController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommentVoteCommand command)
        {
            var id = await Mediator.Send(command);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentVoteCommand command)
        {
            command.CommentVoteId = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await Mediator.Send(new DeleteCommentVoteCommand { CommentVoteId = id });
            return NoContent();
        }
    }
}
