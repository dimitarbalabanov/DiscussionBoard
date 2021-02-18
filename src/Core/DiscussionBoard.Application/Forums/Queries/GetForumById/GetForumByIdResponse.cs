using AutoMapper;
using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdResponse : IMapFrom<Forum>
    {
        public int Id { get; private set; }

        public string Title { get; private set; }

        public string Subtitle { get; private set; }

        public string Description { get; private set; }

        public string Color { get; private set; }

        public string CreatorUserName { get; private set; }

        public string MediaUrl { get; private set; }

        public bool IsCreator { get; set; }

        public int PostsCount { get; private set; }

        public int CommentsCount { get; private set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Forum, GetForumByIdResponse>()
                .ForMember(dest => dest.PostsCount, opt => opt.MapFrom(src => src.Posts.Count()))
                .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Posts.SelectMany(p => p.Comments).Count()));
        }
    }
}
