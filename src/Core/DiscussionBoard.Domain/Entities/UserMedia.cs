namespace DiscussionBoard.Domain.Entities
{
    public class UserMedia : Media
    {
        public string UserId { get; set; }

        public User User { get; set; }
    }
}
