using DiscussionBoard.Application.DTOs.Identity;
using DiscussionBoard.Domain;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(RegisterRequest request);

        Task<AuthenticationResult> LoginAsync(LoginRequest request);
    }
}
