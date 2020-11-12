using DiscussionBoard.Application.Common.Interfaces;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace DiscussionBoard.Shared.Messaging.Extensions
{
    public static class EmailSenderExtensions
    {
        public static Task SendEmailConfirmationAsync(this IEmailSender emailSender, string email, string link)
        {
            return emailSender.SendEmailAsync(email, "Confirm your email", "asdf", "asdf", "asdf",
                $"Please confirm your account by clicking this link: <a href='{HtmlEncoder.Default.Encode(link)}'>link</a>");
        }
    }
}
