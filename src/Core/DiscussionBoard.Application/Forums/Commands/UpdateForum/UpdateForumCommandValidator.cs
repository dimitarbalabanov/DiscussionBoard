﻿using DiscussionBoard.Application.Common.CustomValidators;
using DiscussionBoard.Application.Forums.Commands.Validator;
using FluentValidation;

namespace DiscussionBoard.Application.Forums.Commands.UpdateForum
{
    public class UpdateForumCommandValidator : AbstractValidator<UpdateForumCommand>
    {
        public UpdateForumCommandValidator()
        {
            RuleFor(f => f.Title)
                .IsTitleProperLength();

            RuleFor(f => f.Subtitle)
                .IsSubtitleProperLength();

            RuleFor(f => f.Description)
                .IsDescriptionProperLength();

            RuleFor(f => f.ForumMedia)
                .IsValidTypeAndSize();
        }
    }
}
