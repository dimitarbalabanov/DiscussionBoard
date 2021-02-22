using System;
using System.Collections.Generic;
using System.Text;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class PostVoteDto
    {
        public int Id { get; set; }

        public int PostId { get; set; }

        public string Type { get; set; }
    }
}
