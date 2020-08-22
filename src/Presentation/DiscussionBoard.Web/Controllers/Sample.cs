using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DiscussionBoard.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Sample : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(JsonConvert.SerializeObject("bla bla"));
        }
    }
}
