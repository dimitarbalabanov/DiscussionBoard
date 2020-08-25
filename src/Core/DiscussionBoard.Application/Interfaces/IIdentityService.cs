using DiscussionBoard.Application.DTOs.Identity;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthenticationResponse> RegisterAsync(RegisterRequest request);

        Task<AuthenticationResponse> LoginAsync(LoginRequest request);
    }
}
