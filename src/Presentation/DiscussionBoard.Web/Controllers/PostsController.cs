using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Posts.Commands.CreatePost;
using DiscussionBoard.Application.Posts.Commands.DeletePost;
using DiscussionBoard.Application.Posts.Commands.UpdatePost;
using DiscussionBoard.Application.Posts.Queries.GetAllPosts;
using DiscussionBoard.Application.Posts.Queries.GetPostById;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
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
            Thread.Sleep(300);

            var vm = await Mediator.Send(new GetPostByIdQuery { Id = id, AuthUserId = _authUserService.UserId });
            return Ok(vm);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Thread.Sleep(300);
            var vm = await Mediator.Send(new GetAllPostsQuery());
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreatePostCommand command)
        {
            Thread.Sleep(300);

            command.CreatorId = _authUserService.UserId;
            var response = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]UpdatePostCommand command)
        {
            Thread.Sleep(300);

            command.CreatorId = _authUserService.UserId;
            command.Id = id;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Thread.Sleep(300);

            await Mediator.Send(new DeletePostCommand { Id = id, CreatorId = _authUserService.UserId });
            return NoContent();
        }
    }
}
