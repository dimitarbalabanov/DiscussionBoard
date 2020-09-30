using DiscussionBoard.Application.DTOs.Identity;
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

            if (!response.Success)
            {
                return BadRequest(new LoginFailedResponse
                {
                    Errors = response.Errors
                });
            }

            return Ok(new LoginSuccessResponse
            {
                Token = response.Token,
                Username = response.Username,
                ExpiresAt = response.ExpiresAt
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterCommand command)
        {
            // validation check
            // return BadRequest(new RegisterFailedResponse
            // {
            //     Errors = response.Errors
            // });
            Thread.Sleep(300);

            var response = await Mediator.Send(command);

            if (!response.Success)
            {
                return BadRequest(new RegisterFailedResponse
                {
                    Errors = response.Errors
                });
            }

            return Ok(new RegisterSuccessResponse
            {
                Success = response.Success
            });
        }
    }
}
