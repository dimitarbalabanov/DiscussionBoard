using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.ModelBinders
{
    public class RouteIdBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var routeIdStringValue = bindingContext.ActionContext.RouteData.Values["Id"] as string;

            string valueFromBody;
            // bindingContext.HttpContext.Request.Body.Seek(0,0);
            var asdf = bindingContext.ValueProvider;
            var asdfdf = bindingContext.ValueProvider.GetValue("forumId");
            var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            var body = bindingContext.HttpContext.Request.Body;
            using (var streamReader = new StreamReader(body))
            {
                valueFromBody = streamReader.ReadToEndAsync().Result;
            }

            var modelType = bindingContext.ModelMetadata.UnderlyingOrModelType;
            var modelInstance = JsonConvert.DeserializeObject(valueFromBody, modelType);

            if (!string.IsNullOrWhiteSpace(routeIdStringValue) && Guid.TryParse(routeIdStringValue, out var routeIdValue))
            {
                var idProperty = modelType.GetProperties().FirstOrDefault(p => p.Name.Equals("Id", StringComparison.InvariantCultureIgnoreCase));
                if (idProperty != null)
                {
                    idProperty.SetValue(modelInstance, routeIdValue);
                }
            }

            bindingContext.Result = ModelBindingResult.Success(modelInstance);
            return Task.CompletedTask;
        }
    }
}
