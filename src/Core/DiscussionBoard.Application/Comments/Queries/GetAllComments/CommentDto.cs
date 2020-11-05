using AutoMapper;
using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;
using System.Linq;

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class CommentDto : IMapFrom<Comment>
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CreatorUserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int VotesScore { get; set; }

        public int CurrentUserVoteId { get; set; }

        public string CurrentUserVoteType { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.VotesScore, opt => opt.MapFrom(src => src.Votes.Sum(cv => (int)cv.Vote.Type)));
        }
    }
}
