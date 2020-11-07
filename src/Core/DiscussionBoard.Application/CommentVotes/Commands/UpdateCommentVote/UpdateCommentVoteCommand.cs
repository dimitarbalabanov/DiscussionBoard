﻿using MediatR;

namespace DiscussionBoard.Application.CommentVotes.Commands.UpdateCommentVote
{
    public class UpdateCommentVoteCommand : IRequest
    {
        public int CommentVoteId { get; set; }

        public string Type { get; set; }
    }
}
