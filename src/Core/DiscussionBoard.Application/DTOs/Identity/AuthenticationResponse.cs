using System.Collections.Generic;

namespace DiscussionBoard.Application.DTOs.Identity
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }

        public bool Success { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }
}
