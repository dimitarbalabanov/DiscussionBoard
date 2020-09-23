namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CreatorUserName { get; set; }

        public string CreatorAvatarUrl { get; set; }

        public int VotesScore { get; set; }

        public bool UserHasVoted { get; set; }

        public string VoteType { get; set; }
    }
}
