using DiscussionBoard.Application.Users.Queries.GetUserByUsername;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    public class UsersController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> Get([FromRoute] string username)
        {
            var response = await Mediator.Send(new GetUserByUsernameQuery { UserName = username });
            return Ok(response);
        }
    }
}
