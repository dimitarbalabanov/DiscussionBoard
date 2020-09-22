using System;
using System.Collections.Generic;

namespace DiscussionBoard.Application.Identity.Commands.Login
{
    public class LoginResponse
    {
        public string Token { get; set; }

        public string Username { get; set; }

        public DateTime ExpiresAt { get; set; }

        public bool Success { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }
}
