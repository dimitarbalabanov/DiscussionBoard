using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Responses;
using DiscussionBoard.Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Helpers
{
    public static class CursorPagingExtensions
    {
        private const int PageSize = 10;

        public static IQueryable<T> Page<T>(this IQueryable<T> collection, int? cursor)
            where T : BaseModel<int>
        {
            if (cursor != null)
            {
                var id = (int)cursor;
                collection = collection.Where(x => x.Id > id);
            }

            collection = collection.Take(PageSize);
            return collection;
        }

        public static async Task<IEnumerable<Y>> PageAndRetrieve<T, Y>(this IQueryable<T> collection, int? cursor, IConfigurationProvider configurationProvider)
            where T : BaseModel<int>
        {
            collection = collection.Page(cursor);
            var retrieved = await collection.ProjectTo<Y>(configurationProvider).ToListAsync();
            return retrieved;
        }

        public static PagedResponse<T> GenerateResponse<T>(this ICollection<T> items)
            where T : BaseModel<int>
        {
            var response = new PagedResponse<T>
            {
                //Data = new GetAllPostsResponse { Posts = posts },
                //Cursor = items.Count > 0 ? items[items.Count - 1].Id : default(int?)
                Cursor = items.Last()?.Id
            };

            return response;
        }

        private static (int, DateTime) DecodeCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            var createdOn = DateTime.Parse(split[0]);
            var id = int.Parse(split[1]);
            return (id, createdOn);
        }

        private static string EncodeCursor(int id, DateTime createdOn)
        {
            var cursorStr = createdOn.ToString() + '#' + id;
            var encodedCursor = Convert.ToBase64String(Encoding.UTF8.GetBytes(cursorStr));
            return encodedCursor;
        }
    }
}
