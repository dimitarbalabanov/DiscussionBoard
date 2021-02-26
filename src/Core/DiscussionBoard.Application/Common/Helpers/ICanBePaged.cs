using System.Collections.Generic;

namespace DiscussionBoard.Application.Common.Helpers
{
    public interface ICanBePaged<T>
    {
        IEnumerable<T> Items { get; set; }
    }
}
