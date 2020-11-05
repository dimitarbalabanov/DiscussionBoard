using DiscussionBoard.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionBoard.Domain.Entities
{
    [Table("View_PostsVotesScores")]
    public class PostsVotesScores : IAuditInfo, IScoreSortable
    {
        public int Id { get; set; }

        public int? VotesScore { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
