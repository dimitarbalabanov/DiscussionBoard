using DiscussionBoard.Application.Scores.Queries.GetPostsVotesScores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Controllers
{
    [Authorize]
    public class ScoresController : BaseController
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(GetPostsVotesScoresQuery query)
        {
            Thread.Sleep(300);

            var response = await Mediator.Send(query);

            return Ok(response);
        }
    }
}
