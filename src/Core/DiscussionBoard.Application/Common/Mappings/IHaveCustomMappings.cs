using AutoMapper;

namespace DiscussionBoard.Application.Common.Mappings
{
    public interface IHaveCustomMappings
    {
        void CreateMappings(IProfileExpression configuration);
    }
}
