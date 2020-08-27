using AutoMapper;
using DiscussionBoard.Application.Forums.Queries.GetAllForums;
using DiscussionBoard.Application.Forums.Queries.GetForumById;
using DiscussionBoard.Domain.Entities;

namespace DiscussionBoard.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Forum, ForumDto>();
            CreateMap<Post, PostDto>();
            CreateMap<Forum, GetForumByIdVm>();
        }
    }
}
