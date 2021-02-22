using DiscussionBoard.Application.Comments.Commands.CreateComment;
using DiscussionBoard.Application.Comments.Commands.DeleteComment;
using DiscussionBoard.Application.Comments.Commands.UpdateComment;
using DiscussionBoard.Application.Comments.Queries.GetAllComments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class CommentsController : BaseController
    {
        /// <summary>
        /// Return all comments with query param filtering.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /comments
        ///     {
        ///        "postId": "1"
        ///     }
        ///
        /// </remarks>
        /// <param name="query"></param>
        /// <returns>A list of comments</returns>
        /// <response code="200">A list of comments (can be empty)</response>
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllAsync([FromQuery] GetAllCommentsQuery query)
        {
            var response = await Mediator.Send(query);
            return Ok(response);
        }

        /// <summary>
        /// Creates a comment.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /comments
        ///     {
        ///        "content": "lorem ipsum",
        ///        "postId": "1"
        ///     }
        ///
        /// </remarks>
        /// <param name="command"></param>
        /// <returns>Information about newly created item.</returns>
        /// <response code="201">Returns the newly created item's needed information</response>
        /// <response code="400">Validation error occured</response> 
        /// <response code="401">The user is not logged in.</response> 

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreateAsync([FromBody] CreateCommentCommand command)
        {
            var response = await Mediator.Send(command);
            return new ObjectResult(response)
            {
                StatusCode = StatusCodes.Status201Created
            };
            //return Ok(response);
        }

        /// <summary>
        /// Updates a comment by id.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /comments/1
        ///     {
        ///        "content": "lorem ipsum"
        ///     }
        ///
        /// </remarks>
        /// <param name="commentId"></param>
        /// <param name="command"></param>
        /// <returns>Information about newly created item.</returns>
        /// <response code="204">Returned if successful</response>
        /// <response code="400">Validation error</response> 
        /// <response code="401">User is not logged in.</response> 
        /// <response code="403">User does not have authority (not creator or needed role).</response> 
        /// <response code="404">No comment with this id exists.</response> 
        [HttpPut("{commentId:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int commentId, [FromBody] UpdateCommentCommand command)
        {
            command.CommentId = commentId;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{commentId:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync([FromRoute] int commentId)
        {
            await Mediator.Send(new DeleteCommentCommand { Id = commentId });
            return NoContent();
        }
    }
}
