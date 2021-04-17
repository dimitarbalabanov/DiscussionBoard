using DiscussionBoard.Application.Common.Interfaces;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class AuthorizationAccess
    {
        public static async Task<bool> HasPermissionAsync(string currentUserId, string creatorId, IIdentityService identityService)
        {
            var hasAccess = true;
            if (currentUserId != creatorId)
            {
                if (!await identityService.IsAdminAsync(currentUserId))
                {
                    hasAccess = false;
                }
            }

            return hasAccess;
        }
    }
}
