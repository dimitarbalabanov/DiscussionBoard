using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Posts.Commands.CreatePost;
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
        //[HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
            
        //}

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
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]string command)
        {
            return null;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return null;
        }
    }
}
