using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Application.Common.Queries
{
    public class Paged<T>
    {
        public PageInfo Paging { get; set; }

        public T[] Items { get; set; }
    }
}
