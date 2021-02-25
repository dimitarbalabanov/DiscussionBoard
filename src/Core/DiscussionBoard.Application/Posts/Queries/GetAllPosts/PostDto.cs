using AutoMapper;
using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;
using System.Linq;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class PostDto : IMapFrom<Post>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string CreatorUserName { get; set; }

        public int ForumId { get; set; }

        public string ForumTitle { get; set; }

        public string MediaUrl { get; set; }

        public int CommentsCount { get; set; }

        public int VotesScore { get; set; }

        public bool IsCreator { get; set; }

        public bool IsSaved { get; set; }

        public int? VoteId { get; set; }

        public string VoteType { get; set; }

        public void CreateMappings(Profile profile)
        {
            profile.CreateMap<Post, PostDto>()
                .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Comments.Count()))
                .ForMember(dest => dest.VotesScore, opt => opt.MapFrom(src => src.Votes.Sum(pv => (int)pv.Type)));
        }
    }
}
