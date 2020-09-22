using System.Collections.Generic;

namespace DiscussionBoard.Application.Identity.Commands.Register
{
    public class RegisterResponse
    {
        public bool Success { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }
}
