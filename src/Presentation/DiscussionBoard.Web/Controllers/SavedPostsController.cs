using DiscussionBoard.Application.UserSavedPosts.Commands.CreateUserSavedPost;
using DiscussionBoard.Application.UserSavedPosts.Commands.DeleteUserSavedPost;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]

    public class SavedPostsController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserSavedPostCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteUserSavedPostCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }
    }
}
