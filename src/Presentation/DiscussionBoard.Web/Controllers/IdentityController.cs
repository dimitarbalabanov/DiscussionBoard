using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DiscussionBoard.Application.Identity.Commands.Login;
using DiscussionBoard.Application.Identity.Commands.Register;

namespace DiscussionBoard.Web.Controllers
{
    public class IdentityController : BaseController
    {
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginCommand command)
        {
            var response = await Mediator.Send(command);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }
    }
}
