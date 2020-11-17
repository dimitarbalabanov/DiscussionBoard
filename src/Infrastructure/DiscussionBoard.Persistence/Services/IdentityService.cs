using DiscussionBoard.Application.Common.DTOs;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly JwtSettings _jwtSettings;

        public IdentityService(UserManager<User> userManager, IEmailSender emailSender, JwtSettings jwtSettings)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _jwtSettings = jwtSettings;
        }
        public async Task<IdentityResultDto> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return new IdentityResultDto { Error = "Bad login attempt" };
            }

            if (!await _userManager.CheckPasswordAsync(user, password))
            {
                return new IdentityResultDto { Error = "Bad login attempt" };
            }

            //if (!await _userManager.IsEmailConfirmedAsync(user))
            //{
            //    return new IdentityResultDto { Error = "Email is not confirmed" };
            //}

            var (token, expiration) = await GenerateJwtToken(user);

            return new IdentityResultDto
            {
                Succeeded = true,
                Token = token,
                ExpiresAt = expiration,
                UserName = user.UserName
            };
        }

        public async Task<IdentityResultDto> RegisterAsync(string email, string username, string password)
        {
            if (await _userManager.FindByEmailAsync(email) != null)
            {
                return new IdentityResultDto { Error = "User with this email already exists" };
            }

            if (await _userManager.FindByNameAsync(username) != null)
            {
                return new IdentityResultDto { Error = "User with this username already exists" };
            }

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = email,
                UserName = username
            };
            
            var createdUser = await _userManager.CreateAsync(user, password);
            if (!createdUser.Succeeded)
            {
                return new IdentityResultDto { Error = string.Join(" ", createdUser.Errors.Select(e => e.Description)) };
            }

            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //var callbackUrl = $"https://localhost:44322/confirmEmail?userId={user.Id}&code={code}";
            //await _emailSender.SendEmailAsync(
            //    "dimitar.balabanov@gmail.com",
            //    "Discussion Board",
            //    user.Email,
            //    user.UserName,
            //    "Please confirm your account",
            //    "link");
            //$"Please confirm your account by clicking this link: <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>link</a>");

            return new IdentityResultDto { Succeeded = true };
        }

        public async Task<IdentityResultDto> ConfirmEmailAsync(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new IdentityResultDto { Error = "User does not exist" };
            }

            if (await _userManager.IsEmailConfirmedAsync(user))
            {
                return new IdentityResultDto { Error = "Email has already been confirmed" };
            }

            var confirmResult = await _userManager.ConfirmEmailAsync(user, code);

            var result = confirmResult.Succeeded
                ? new IdentityResultDto { Succeeded = true }
                : new IdentityResultDto { Error = string.Join(" ", confirmResult.Errors.Select(e => e.Description)) };
            return result;
        }

        private async Task<(string, DateTime)> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            };

            var userClaims = await _userManager.GetClaimsAsync(user);
            claims.AddRange(userClaims);

            var userRoles = await _userManager.GetRolesAsync(user);
            var roleClaims = userRoles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
            claims.AddRange(roleClaims);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var expiration = DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiration,
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return (tokenHandler.WriteToken(token), expiration);
        }
    }
}
