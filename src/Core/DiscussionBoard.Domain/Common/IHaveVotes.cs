using System.Collections.Generic;

namespace DiscussionBoard.Domain.Common
{
    public interface IHaveVotes<T> 
        where T : BaseVote 
    {
        ICollection<T> Votes { get; set; }
    }
}
