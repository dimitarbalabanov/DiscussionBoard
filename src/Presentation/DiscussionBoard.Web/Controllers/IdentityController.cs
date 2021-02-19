using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DiscussionBoard.Application.Identity.Commands.Login;
using DiscussionBoard.Application.Identity.Commands.Register;
using DiscussionBoard.Application.Identity.Commands.ConfirmEmail;

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
            var response = await Mediator.Send(command);
            return Ok(response);
        }

        //[HttpGet("profile")]
        //public async Task<IActionResult> GetProfileAsync()
        //{
        //    var response = await Mediator.Send(new GetProfileQuery());
        //    return Ok(response);
        //}

        [HttpGet("confirmEmail")]
        public async Task<IActionResult> ConfirmEmailAsync([FromQuery] ConfirmEmailCommand command)
        {
            var response = await Mediator.Send(command);
            return Ok(response);
        }
    }
}
