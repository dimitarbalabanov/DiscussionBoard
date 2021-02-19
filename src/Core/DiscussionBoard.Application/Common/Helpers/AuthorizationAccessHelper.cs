using DiscussionBoard.Application.Common.Interfaces;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class AuthorizationAccessHelper
    {
        public static async Task<bool> HasPermissionToAccessAsync(string currentUserId, string realCreatorId, IIdentityService identityService)
        {
            var isCreator = currentUserId == realCreatorId;
            var isAdmin = await identityService.IsAdminAsync(currentUserId);
            var hasPermission = isCreator || isAdmin;
            return hasPermission;
        }
    }
}
