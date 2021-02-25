namespace DiscussionBoard.Application.Forums.Queries.GetForumById
{
    public class GetForumByIdResponse
    {
        public int Id { get; private set; }

        public string Title { get; private set; }

        public string Subtitle { get; private set; }

        public string Description { get; private set; }

        public string CreatorUserName { get; private set; }

        public string MediaUrl { get; private set; }

        public bool IsCreator { get; set; }

        public int PostsCount { get; private set; }
    }
}
