using System.Collections.Generic;

namespace DiscussionBoard.Application.DTOs.Identity
{
    public class LoginFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
