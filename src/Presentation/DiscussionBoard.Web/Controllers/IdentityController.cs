using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DiscussionBoard.Application.Identity.Commands.Login;
using DiscussionBoard.Application.Identity.Commands.Register;
using System.Threading;

namespace DiscussionBoard.Web.Controllers
{
    public class IdentityController : BaseController
    {
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginCommand command)
        {
            Thread.Sleep(300);

            var response = await Mediator.Send(command);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterCommand command)
        {
            Thread.Sleep(300);

            await Mediator.Send(command);

            return Ok();
        }
    }
}
