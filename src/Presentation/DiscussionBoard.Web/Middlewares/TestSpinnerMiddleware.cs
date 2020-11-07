using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Middlewares
{
    public class TestSpinnerMiddleware
    {
        private readonly RequestDelegate _next;

        public TestSpinnerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            Thread.Sleep(300);
            await _next(context);
        }
    }
}
