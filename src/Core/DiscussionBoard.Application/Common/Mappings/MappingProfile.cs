using AutoMapper;
using DiscussionBoard.Application.Comments.Commands.CreateComment;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using DiscussionBoard.Application.Posts.Commands.CreatePost;
using DiscussionBoard.Application.Posts.Queries.GetPostById;
using DiscussionBoard.Application.Votes.Commands.CreateVote;
using DiscussionBoard.Domain.Entities;
using System.Linq;

namespace DiscussionBoard.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Forum, ForumDto>();
            CreateMap<Post, PostDto>();
            CreateMap<Forum, GetForumByIdVm>();
            CreateMap<Post, GetPostByIdVm>();
            CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.VotesScore, src => src.MapFrom(x => x.Votes.Sum(x => (int)x.Type)));

            CreateMap<CreatePostCommand, Post>();

            CreateMap<CreateCommentCommand, Comment>();

            CreateMap<CreateVoteCommand, Vote>();
        }
    }
}
