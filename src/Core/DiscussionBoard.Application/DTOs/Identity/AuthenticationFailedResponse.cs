using System.Collections.Generic;

namespace DiscussionBoard.Application.DTOs.Identity
{
    public class AuthenticationFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
