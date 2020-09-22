using System.Collections.Generic;

namespace DiscussionBoard.Application.DTOs.Identity
{
    public class RegisterFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
