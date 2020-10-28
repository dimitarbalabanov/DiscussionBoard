using AutoMapper;
using DiscussionBoard.Domain.Entities;
using System.Linq;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int PostsCount { get; set; }

        public int CommentsCount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Forum, GetForumByIdResponse>()
                .ForMember(dest => dest.PostsCount, opt => opt.MapFrom(src => src.Posts.Count()))
                .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Posts.SelectMany(p => p.Comments).Count()));
        }
    }
}
