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

        public string Title { get; private set; }

        public string Subtitle { get; private set; }

        public string Description { get; private set; }

        public string Color { get; private set; }

        public IFormFile MediaFile { get; private set; }

        public IEnumerable<RuleDto> Rules { get; private set; }
    }
}
