using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Identity.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, string>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _sender;

        public RegisterCommandHandler(UserManager<User> userManager, IEmailSender sender)
        {
            _userManager = userManager;
            _sender = sender;
        }

        public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                UserName = request.UserName,
                Media = new UserMedia { PublicId = "asdasdsadasdsadsa", Url = "asddsadsasadasd" }
            };

            var createdUser = await _userManager.CreateAsync(user, request.Password);
            if (!createdUser.Succeeded)
            {
                throw new AuthRequestException(string.Join(" ", createdUser.Errors.Select(e => e.Description)));
            }

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = $"https://localhost:44322/confirmEmail?userId={user.Id}&code={code}";

            await _sender.SendEmailAsync(
                "dimitar.balabanov@gmail.com",
                "Discussion Board",
                request.Email,
                request.UserName,
                "Please confirm your account",
                "link");
            //$"Please confirm your account by clicking this link: <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>link</a>");

            return callbackUrl;
        }
    }
}

//var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
//var from = new EmailAddress("dimitar.balabanov@gmail.com", "Discussion Board");
//var to = new EmailAddress("dimcho.balabanov@gmail.com", "Example user");
//var msg = new SendGridMessage
//{
//    From = from,
//    Subject = "Sending with Twilio SendGrid is Fun"
//};
//msg.AddContent(MimeType.Text, "and easy to do anywhere, even with C#");
//msg.AddTo(to);

//Console.WriteLine($"Sending email with payload: \n{msg.Serialize()}");