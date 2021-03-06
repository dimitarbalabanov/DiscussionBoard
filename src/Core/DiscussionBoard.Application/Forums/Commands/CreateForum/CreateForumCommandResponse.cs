﻿using DiscussionBoard.Application.Common.Mappings;
using DiscussionBoard.Domain.Entities;
using System;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommandResponse : IMapFrom<Forum>
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string MediaUrl { get; set; }
    }
}
