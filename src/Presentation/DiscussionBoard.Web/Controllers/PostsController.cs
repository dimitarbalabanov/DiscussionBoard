using DiscussionBoard.Application.Common.Queries;
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
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            Thread.Sleep(300);

            var vm = await Mediator.Send(new GetPostByIdQuery { Id = id });

            return Ok(vm);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllPostsQuery query)
        {
            var context = this.HttpContext;
            Thread.Sleep(300);
            var vm = await Mediator.Send(query);

            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePostCommand command)
        {
            Thread.Sleep(300);

            var response = await Mediator.Send(command);

            return CreatedAtAction(nameof(Get), new { response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePostCommand command)
        {
            Thread.Sleep(300);

            command.Id = id;
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Thread.Sleep(300);

            await Mediator.Send(new DeletePostCommand { Id = id });

            return NoContent();
        }
    }
}
