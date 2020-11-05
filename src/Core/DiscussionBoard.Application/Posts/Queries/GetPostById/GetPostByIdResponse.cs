using AutoMapper;
using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;
using System.Linq;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdResponse : IMapFrom<Post>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatorUserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int CommentsCount { get; set; }

        public int ForumId { get; set; }

        public string ForumTitle { get; set; }

        public int VotesScore { get; set; }

        public int CurrentUserVoteId { get; set; }

        public string CurrentUserVoteType { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Post, GetPostByIdResponse>()
                .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Comments.Count()))
                .ForMember(dest => dest.VotesScore, opt => opt.MapFrom(src => src.Votes.Sum(pv => (int)pv.Vote.Type)));
        }
    }
}
