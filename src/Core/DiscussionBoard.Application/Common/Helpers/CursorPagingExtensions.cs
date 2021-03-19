using System;
using System.Text;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class CursorPagingExtensions
    {
        public static (int, DateTime) DecodeSortCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            var id = int.Parse(split[0]);
            var createdOn = DateTime.Parse(split[1]);
            return (id, createdOn);
        }

        public static (int, DateTime, int) DecodeTopCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            var id = int.Parse(split[0]);
            var createdOn = DateTime.Parse(split[1]);
            var votesScore = int.Parse(split[2]);
            return (id, createdOn, votesScore);
        }

        public static string EncodeCursor(int id, DateTime createdOn)
        {
            var cursorStr = createdOn.ToString() + '#' + id;
            var encodedCursor = Convert.ToBase64String(Encoding.UTF8.GetBytes(cursorStr));
            return encodedCursor;
        }
    }
}
