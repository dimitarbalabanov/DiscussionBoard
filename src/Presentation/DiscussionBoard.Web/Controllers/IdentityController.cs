using DiscussionBoard.Application.DTOs.Identity;
using DiscussionBoard.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            var authResponse = await _identityService.LoginAsync(request);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthenticationFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AuthenticationSuccessResponse
            {
                Token = authResponse.Token
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequest request)
        {
            // validation check
            // return BadRequest(new AuthenticationFailedResponse
            // {
            //     Errors = 
            // });

            var authResponse = await _identityService.RegisterAsync(request);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthenticationFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AuthenticationSuccessResponse
            {
                Token = authResponse.Token
            });
        }
    }
}
