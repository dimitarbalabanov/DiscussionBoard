using DiscussionBoard.Application.Common.Responses;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class CursorPagination<T>
    {
        private const int PageSize = 10;

        public Task<PagedResponse<T>> Paginate(IQueryable<T> query)
        {
            //int total = query.Count();

            //if (request.ForumId != null)
            //{
            //    query = query.Where(p => p.ForumId == request.ForumId);
            //}

            //if (_authUserService.UserId != null)
            //{
            //    if (request.Filter == "my")
            //    {
            //        query.Where(p => p.CreatorId == _authUserService.UserId);
            //    }
            //    else if (request.Filter == "saved")
            //    {
                    
            //    }
            //}

            //if (request.Cursor != null)
            //{
            //    var (id, createdOn) = DecodeCursor(request.Cursor);

            //    query = query.Where(p => p.CreatedOn <= createdOn && (p.Id == id || p.CreatedOn <= createdOn));
            //    query = query.OrderByDescending(p => p.CreatedOn)
            //        .ThenByDescending(p => p.Id);
            //}

            //// sorting, if present, here...
            //if (request.Sort != null)
            //{
            //    switch (request.Sort)
            //    {
            //        case "top":
            //            query = query;
            //            break;
            //        case "newest":
            //            query = query;
            //            break;

            //        default:
            //            break;
            //    }
            //}

            //query = query.Take(PageSize);

            //var posts = await query.ProjectTo<PostDto>(_mapper.ConfigurationProvider)
            //    .ToListAsync();

            //var response = new PagedResponse<GetAllPostsResponse>
            //{
            //    Data = new GetAllPostsResponse { Posts = posts },
            //    Cursor = "",
            //    TotalCount = total,
            //    CurrentCount = posts.Count
            //};

            //if (posts.Count > 0)
            //{
            //    var lastPost = posts[posts.Count - 1];
            //    var cursor = EncodeCursor(lastPost.Id, lastPost.CreatedOn);
            //    response.Cursor = cursor;
            //}

            return (Task<PagedResponse<T>>)Task.CompletedTask;
        }

        private (int, DateTime) DecodeCursor(string encodedCursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCursor));
            var split = decodedCursor.Split('#');
            var createdOn = DateTime.Parse(split[0]);
            var id = int.Parse(split[1]);
            return (id, createdOn);
        }

        private string EncodeCursor(int id, DateTime createdOn)
        {
            var cursorStr = createdOn.ToString() + '#' + id;
            var encodedCursor = Convert.ToBase64String(Encoding.UTF8.GetBytes(cursorStr));
            return encodedCursor;
        }
    }
}