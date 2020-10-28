using AutoMapper;
using System;
using System.Linq;
using System.Reflection;

namespace DiscussionBoard.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
        }
        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);
                var methodInfo = type.GetMethod("Mapping");
                methodInfo?.Invoke(instance, new object[] { this });
            }
        }

        //CreateMap<Forum, ForumDto>()
        //    .ForMember(dest => dest.PostsCount, src => src.MapFrom(x => x.Posts.Count()))
        //    .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Posts.SelectMany(x => x.Comments).Count()));

        //CreateMap<Forum, GetForumByIdVm>()
        //    .ForMember(dest => dest.PostsCount, src => src.MapFrom(x => x.Posts.Count()))
        //    .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Posts.SelectMany(x => x.Comments).Count()));

        //CreateMap<Post, PostDto>()
        //    .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Comments.Count()));

        //CreateMap<Post, GetPostByIdVm>()
        //    .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Comments.Count()));

        //CreateMap<Comment, CommentDto>()
        //    .ForMember(dest => dest.VotesScore, src => src.MapFrom(x => x.Votes.Sum(x => (int)x.Type)));

        //CreateMap<CreatePostCommand, Post>();
        //CreateMap<Post, CreatePostCommandResponse>();

        //CreateMap<CreateCommentCommand, Comment>();
        //CreateMap<Comment, CreateCommentCommandResponse>();
    }
}
