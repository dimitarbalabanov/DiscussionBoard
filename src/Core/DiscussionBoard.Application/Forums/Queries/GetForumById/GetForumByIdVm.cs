namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdVm
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int PostsCount { get; set; }

        public int CommentsCount { get; set; }
    }
}
