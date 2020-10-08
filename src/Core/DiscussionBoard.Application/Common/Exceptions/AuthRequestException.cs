using System;

namespace DiscussionBoard.Application.Common.Exceptions
{
    public class AuthRequestException : Exception
    {
        public AuthRequestException(string message) 
            : base(message)
        {
        }
    }
}
