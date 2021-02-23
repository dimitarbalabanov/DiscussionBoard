namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class PostVoteDto
    {
        public int Id { get; set; }

        public int PostId { get; set; }

        public string Type { get; set; }
    }
}
