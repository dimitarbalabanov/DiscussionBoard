using DiscussionBoard.Application.Common.DTOs;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<IdentityResultDto> LoginAsync(string email, string password);

        Task<IdentityResultDto> RegisterAsync(string email, string username, string password);

        Task<IdentityResultDto> ConfirmEmailAsync(string userId, string code);
    }
}
