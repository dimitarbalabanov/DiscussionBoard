namespace DiscussionBoard.Domain.Settings
{
    public class JwtSettings
    {
        public string Secret { get; set; }

        public double DurationInMinutes { get; set; }
    }
}
