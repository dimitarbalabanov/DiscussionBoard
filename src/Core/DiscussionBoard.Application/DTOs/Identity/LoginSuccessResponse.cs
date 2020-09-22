using System;

namespace DiscussionBoard.Application.DTOs.Identity
{
    public class LoginSuccessResponse
    {
        public string Token { get; set; }

        public DateTime ExpiresAt { get; set; }

        public string Username { get; set; }
    }
}
