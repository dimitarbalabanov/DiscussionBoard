using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.Json;

namespace DiscussionBoard.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Sample : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Sample(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] JsonElement input)
        {
            var asdf = System.Text.Json.JsonSerializer.Serialize(input);
            var forum = new Forum
            {
                Title = "asdf",
                Description = "asdf"
            };

            _context.Forums.Add(forum);
            _context.SaveChanges();
            return Ok(JsonConvert.SerializeObject(forum));
        }
    }
}
