namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class CommentVoteDto
    {
        public int Id { get; set; }

        public int CommentId { get; set; }

        public string Type { get; set; }
    }
}
