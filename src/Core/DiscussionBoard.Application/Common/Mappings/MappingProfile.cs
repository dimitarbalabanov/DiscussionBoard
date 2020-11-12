using AutoMapper;
using System;
using System.Collections.Generic;
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
            var types = assembly.GetExportedTypes();

            // IMapFrom<>
            foreach (var map in GetFromMaps(types))
            {
                CreateMap(map.Source, map.Destination);
            }

            // IMapTo<>
            foreach (var map in GetToMaps(types))
            {
                CreateMap(map.Source, map.Destination);
            }

            // IHaveCustomMappings
            foreach (var map in GetCustomMappings(types))
            {
                map.CreateMappings(this);
            }
        }

        private IEnumerable<TypesMap> GetFromMaps(IEnumerable<Type> types)
        {
            var fromMaps = from t in types
                           from i in t.GetTypeInfo().GetInterfaces()
                           where i.GetTypeInfo().IsGenericType &&
                                 i.GetGenericTypeDefinition() == typeof(IMapFrom<>) &&
                                 !t.GetTypeInfo().IsAbstract &&
                                 !t.GetTypeInfo().IsInterface
                           select new TypesMap
                           {
                               Source = i.GetTypeInfo().GetGenericArguments()[0],
                               Destination = t,
                           };

            return fromMaps;
        }

        private IEnumerable<TypesMap> GetToMaps(IEnumerable<Type> types)
        {
            var toMaps = from t in types
                         from i in t.GetTypeInfo().GetInterfaces()
                         where i.GetTypeInfo().IsGenericType &&
                               i.GetTypeInfo().GetGenericTypeDefinition() == typeof(IMapTo<>) &&
                               !t.GetTypeInfo().IsAbstract &&
                               !t.GetTypeInfo().IsInterface
                         select new TypesMap
                         {
                             Source = t,
                             Destination = i.GetTypeInfo().GetGenericArguments()[0],
                         };

            return toMaps;
        }

        private IEnumerable<IHaveCustomMappings> GetCustomMappings(IEnumerable<Type> types)
        {
            var customMaps = from t in types
                             from i in t.GetTypeInfo().GetInterfaces()
                             where typeof(IHaveCustomMappings).GetTypeInfo().IsAssignableFrom(t) &&
                                   !t.GetTypeInfo().IsAbstract &&
                                   !t.GetTypeInfo().IsInterface
                             select (IHaveCustomMappings)Activator.CreateInstance(t);

            return customMaps;
        }

        public class TypesMap
        {
            public Type Source { get; set; }

            public Type Destination { get; set; }
        }

        //private void ApplyMappingsFromAssembly(Assembly assembly)
        //{
        //    var types = assembly.GetExportedTypes()
        //        .Where(t => t.GetInterfaces().Any(i =>
        //            i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
        //        .ToList();

        //    foreach (var type in types)
        //    {
        //        var instance = Activator.CreateInstance(type);
        //        var methodInfo = type.GetMethod("Mapping");
        //        methodInfo?.Invoke(instance, new object[] { this });
        //    }
        //}

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
