using AutoMapper;
using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System.Linq;

namespace DiscussionBoard.Application.Users.Queries.GetUserByUsername
{
    public class GetUserByUsernameQueryResponse : IMapFrom<User>, IHaveCustomMappings
    {
        public string MediaUrl { get; set; }

        public string Bio { get; set; }

        public int Karma { get; set; }

        public int PostsCount { get; set; }

        public int CommentsCount { get; set; }

        public void CreateMappings(Profile profile)
        {
            profile.CreateMap<User, GetUserByUsernameQueryResponse>()
                   .ForMember(dest => dest.PostsCount, opt => opt.MapFrom(src => src.Posts.Count))
                   .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Comments.Count))
                   .ForMember(dest => dest.Karma, opt => opt.MapFrom(src =>
                        src.Posts.SelectMany(p => p.Votes).Sum(pv => (int)pv.Type) 
                        + src.Comments.SelectMany(c => c.Votes).Sum(cv => (int)cv.Type)));
        }
    }
}