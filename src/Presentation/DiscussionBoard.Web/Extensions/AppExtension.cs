using DiscussionBoard.Web.Middlewares;
using Microsoft.AspNetCore.Builder;

namespace DiscussionBoard.Web.Extensions
{
    public static class AppExtension
    {
        public static void UseSwaggerExtension(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "DiscussionBoard API");
                c.RoutePrefix = string.Empty;
            });
        }
        public static void UseErrorHandlingMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<CustomExceptionHandlerMiddleware>();
        }

        public static void UseSpinnerTestingMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<TestSpinnerMiddleware>();
        }
    }
}
