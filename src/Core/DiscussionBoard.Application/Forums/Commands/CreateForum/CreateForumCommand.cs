using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommand : IRequest<CreateForumCommandResponse>, IMapTo<Forum>
    {
        public CreateForumCommand(string title, string subtitle, 
            string description, string color,
            IFormFile mediaFile, IEnumerable<RuleDto> rules)
        {
            Title = title;
            Subtitle = subtitle;
            Description = description;
            Color = color;
            MediaFile = mediaFile;
            Rules = rules;
        }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }

        public IFormFile MediaFile { get; set; }

        public IEnumerable<RuleDto> Rules { get; set; }
    }
}
