using DiscussionBoard.Application.Common.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace DiscussionBoard.Shared.MessagingService
{
    public class SendGridEmailSender : IEmailSender
    {
        private readonly SendGridClient _client;

        public SendGridEmailSender(string apiKey)
        {
            _client = new SendGridClient(apiKey);
        }

        public async Task SendEmailAsync(string from, string fromName, string to, string toName, string subject, string htmlContent)
        {
            if (string.IsNullOrWhiteSpace(subject) && string.IsNullOrWhiteSpace(htmlContent))
            {
                throw new ArgumentException("Subject and message should be provided.");
            }

            var message = MailHelper.CreateSingleEmail(
                new EmailAddress(from, fromName),
                new EmailAddress(to, toName),
                subject,
                null,
                htmlContent);

            //var msg = new SendGridMessage
            //{
            //    From = new EmailAddress(from, fromName),
            //    Subject = subject,
            //    HtmlContent = htmlContent,
            //};
            //msg.AddTo(new EmailAddress(to, toName));

            try
            {
                var response = await _client.SendEmailAsync(message);
                Console.WriteLine(response.StatusCode);
                Console.WriteLine(await response.Body.ReadAsStringAsync());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
