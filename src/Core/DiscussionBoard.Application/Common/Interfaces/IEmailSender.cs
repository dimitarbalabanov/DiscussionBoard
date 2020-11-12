using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string from, string fromName, string to, string toName, string subject, string htmlContent);
    }
}
