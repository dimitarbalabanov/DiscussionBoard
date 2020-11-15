using System;

namespace DiscussionBoard.Application.Common.DTOs
{
    public class IdentityResultDto
    {
        public bool Succeeded { get; set; }

        public string Token { get; set; }

        public DateTime ExpiresAt { get; set; }

        public string UserName { get; set; }

        public string Error { get; set; }
    }
}
