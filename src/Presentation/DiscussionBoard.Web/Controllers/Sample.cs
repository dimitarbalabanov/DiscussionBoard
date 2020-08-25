using DiscussionBoard.Application.Interfaces;
using DiscussionBoard.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DiscussionBoard.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class Sample : ControllerBase
    {
        private readonly IAuthenticatedUserService _authUserService;

        public Sample(IAuthenticatedUserService authUserService)
        {
            _authUserService = authUserService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(JsonConvert.SerializeObject(_authUserService.UserId));
        }
    }
}
