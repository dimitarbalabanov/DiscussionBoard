using System;
using System.Collections.Generic;

namespace DiscussionBoard.Domain
{
    public class AuthenticationResult
    {
        public string Token { get; set; }

        public bool Success { get; set; }

        public string Username { get; set; }

        public DateTime ExpiresAt { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }
}
