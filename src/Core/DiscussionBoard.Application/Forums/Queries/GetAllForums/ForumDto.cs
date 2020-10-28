using AutoMapper;
using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System.Linq;

namespace DiscussionBoard.Application.Forums.Queries.GetAllForums
{
    public class ForumDto : IMapFrom<Forum>
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }
}
