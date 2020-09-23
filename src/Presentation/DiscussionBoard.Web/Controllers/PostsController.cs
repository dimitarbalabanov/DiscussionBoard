using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Posts.Commands.CreatePost;
using DiscussionBoard.Application.Posts.Commands.DeletePost;
using DiscussionBoard.Application.Posts.Commands.UpdatePost;
using DiscussionBoard.Application.Posts.Queries.GetPostById;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class PostsController : BaseController
    {
        private readonly IAuthenticatedUserService _authUserService;

        public PostsController(IAuthenticatedUserService authUserService)
        {
            _authUserService = authUserService;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await Mediator.Send(new GetPostByIdQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreatePostCommand command)
        {
            command.CreatorId = _authUserService.UserId;
            var response = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { response.PostId }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]UpdatePostCommand command)
        {
            command.CreatorId = _authUserService.UserId;
            command.Id = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeletePostCommand { Id = id, CreatorId = _authUserService.UserId });
            return NoContent();
        }
    }
}
