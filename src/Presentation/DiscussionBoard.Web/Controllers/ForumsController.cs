using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    public class ForumsController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Thread.Sleep(300);
            var vm = await Mediator.Send(new GetAllForumsQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await Mediator.Send(new GetForumByIdQuery { Id = id });
            Thread.Sleep(300);
            return Ok(vm);
        }
    }
}
