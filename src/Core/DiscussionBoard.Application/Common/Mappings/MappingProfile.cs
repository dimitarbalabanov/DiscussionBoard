using AutoMapper;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using DiscussionBoard.Application.Posts.Commands.CreatePost;
using DiscussionBoard.Application.Posts.Queries.GetPostById;
using DiscussionBoard.Domain.Entities;

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
            CreateMap<Comment, CommentDto>();

            CreateMap<CreatePostCommand, Post>();
        }
    }
}
