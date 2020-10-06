using AutoMapper;
using DiscussionBoard.Application.Comments.Commands.CreateComment;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using DiscussionBoard.Application.Posts.Commands.CreatePost;
using DiscussionBoard.Application.Posts.Queries.GetAllPosts;
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
            CreateMap<Forum, ForumDto>()
                .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Posts.SelectMany(x => x.Comments).Count()));

            CreateMap<Forum, GetForumByIdVm>()
                .ForMember(dest => dest.Posts, src => src.Ignore())
                .ForMember(dest => dest.PostsCount, src => src.Ignore());
            CreateMap<Post, PostDto>()
                .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Comments.Count()));

            CreateMap<Post, GetAllPostsPostDto>()
                .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Comments.Count()));

            CreateMap<Post, GetPostByIdVm>();
                //.ForMember(src => src.Comments, opt => opt.Ignore());

            CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.VotesScore, src => src.MapFrom(x => x.Votes.Sum(x => (int)x.Type)));

            CreateMap<CreatePostCommand, Post>();
            CreateMap<Post, CreatePostCommandResponse>();

            CreateMap<CreateCommentCommand, Comment>();
            CreateMap<Comment, CreateCommentCommandResponse>();

            CreateMap<CreateVoteCommand, Vote>();
        }
    }
}
