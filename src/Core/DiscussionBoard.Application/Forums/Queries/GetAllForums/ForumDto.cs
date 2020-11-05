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

        public int PostsCount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Forum, ForumDto>()
                   .ForMember(dest => dest.PostsCount, opt => opt.MapFrom(src => src.Posts.Count()));
        }
    }
}
