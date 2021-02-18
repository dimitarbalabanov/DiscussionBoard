namespace DiscussionBoard.Application.Forums.Commands.UpdateForum
{
    public class UpdateForumCommand
    {
        public UpdateForumCommand(int forumId)
        {
            ForumId = forumId;
        }
        public int ForumId { get; private set; }
    }
}
