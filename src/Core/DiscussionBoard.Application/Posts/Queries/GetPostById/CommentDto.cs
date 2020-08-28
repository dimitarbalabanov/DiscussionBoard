namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Content { get; set; }

        //public string CreatorId { get; set; }
        //public virtual ApplicationUser Creator { get; set; }
        //public virtual ICollection<Vote> Votes { get; set; }
    }
}
