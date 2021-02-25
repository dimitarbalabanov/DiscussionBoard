using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Helpers.Enums;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Application.Common.Responses;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PagedResponse<GetAllPostsResponse>>
    {
        private const int PageSize = 10;

        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<UserPostSave> _savesRepository;
        private readonly IRepository<User> _usersRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetAllPostsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IRepository<Post> postsRepository,
            IRepository<PostVote> postVotesRepository,
            IRepository<UserPostSave> savesRepository,
            IRepository<User> usersRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _postVotesRepository = postVotesRepository;
            _savesRepository = savesRepository;
            _usersRepository = usersRepository;
            _authUserService = authUserService;
            _mapper = mapper;
            _readDbConnection = readDbConnection;
        }

        public async Task<PagedResponse<GetAllPostsResponse>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {

            var postsQuery = new StringBuilder();
            postsQuery.AppendLine("SELECT p.Id,");
            postsQuery.AppendLine("       p.Title,");
            postsQuery.AppendLine("       p.Content,");
            postsQuery.AppendLine("       p.CreatedOn,");
            postsQuery.AppendLine("       p.ModifiedOn,");
            postsQuery.AppendLine("       u.UserName               AS CreatorUserName,");
            postsQuery.AppendLine("       p.ForumId,");
            postsQuery.AppendLine("       f.Title                  AS ForumTitle,");
            postsQuery.AppendLine("       pm.Url                   AS MediaUrl,");
            postsQuery.AppendLine("       (SELECT Count(*)");
            postsQuery.AppendLine("        FROM   Comments AS c");
            postsQuery.AppendLine("        WHERE  p.Id = c.PostId) AS CommentsCount,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                postsQuery.AppendLine("       Cast(CASE");
                postsQuery.AppendLine($"              WHEN p.CreatorId = {userId} THEN 1");
                postsQuery.AppendLine("              ELSE 0");
                postsQuery.AppendLine("            END AS BIT)             AS IsCreator,");
            }

            var order = Enum.Parse<Order>(request.Sort, true);
            if (order == Order.Top)
            {
                postsQuery.AppendLine("       p.VotesScore");
            }
            else
            {
                postsQuery.AppendLine("       (SELECT Sum(Cast(pv.Type AS INT))");
                postsQuery.AppendLine("        FROM   PostVotes AS pv");
                postsQuery.AppendLine("        WHERE  p.Id = pv.CommentId) AS VotesScore");
            }

            postsQuery.AppendLine("FROM   (SELECT TOP({pageSize}) sp.Id,");
            postsQuery.AppendLine("                       sp.Title,");
            postsQuery.AppendLine("                       sp.Content,");
            postsQuery.AppendLine("                       sp.CreatedOn,");
            postsQuery.AppendLine("                       sp.ModifiedOn,");
            postsQuery.AppendLine("                       sp.CreatorId,");
            postsQuery.AppendLine("                       sp.ForumId,");

            if (order == Order.Top)
            {
                postsQuery.Append(",");
                postsQuery.AppendLine("                       (SELECT Sum(Cast(pv.Type AS int))");
                postsQuery.AppendLine("                        FROM   PostVotes AS pv");
                postsQuery.AppendLine("                        WHERE  sp.Id = pv.PostId) AS VotesScore");
            }

            postsQuery.AppendLine("        FROM   Posts AS sp");

            if (request.Cursor != null)
            {
                postsQuery.AppendLine("               AND ( sp.Id > {cursor} )");
            }

            if (request.ForumId != null)
            {
                postsQuery.AppendLine("                 AND ( sp.ForumId = 2 ) )");
            }

            if (order == Order.Top)
            {
                if (Enum.TryParse(request.Top, out Interval interval))
                {
                    var time = interval.ToDateTimeString();
                    postsQuery.AppendLine("                 AND ( sp.CreatedOn >= {time} )");
                }

                postsQuery.AppendLine("        ORDER  BY VotesScore DESC) AS p");
            }
            else
            {
                var ord = order.ToSqlOrderString();
                postsQuery.AppendLine($"        ORDER BY sp.CreatedOn {ord}) AS p");
            }

            postsQuery.AppendLine("       INNER JOIN AspNetUsers AS u");
            postsQuery.AppendLine("               ON p.CreatorId = u.Id");
            postsQuery.AppendLine("       INNER JOIN Forums AS f");
            postsQuery.AppendLine("               ON p.ForumId = f.Id");
            postsQuery.AppendLine("       LEFT JOIN PostMedias AS pm");
            postsQuery.AppendLine("              ON p.Id = pm.PostId");

            //var posts = await _readDbConnection.QueryAsync<PostDto>(postsQueryBuilder.ToString());

            //Dictionary<int, PostDto> dict = null;
            //if (userId != null)
            //{
            //    dict = posts.ToDictionary(x => x.Id, x => x);
            //    var postIds = string.Join(", ", posts.Select(p => p.Id).ToArray());

            //    var postVotesQuery =
            //        $@"SELECT p.Id, p.PostId, p.Type
            //        FROM PostVotes AS p
            //        WHERE p.PostId IN ({postIds}) AND (p.CreatorId = {userId})";
            //    var votes = await _readDbConnection.QueryAsync<PostVoteDto>(postVotesQuery);

            //    foreach (var v in votes)
            //    {
            //        dict[v.PostId].VoteId = v.Id;
            //        dict[v.PostId].VoteType = v.Type;
            //    }

            //    var savedPostsQuery =
            //        $@"SELECT u.PostId
            //        FROM UserPostSaves AS u
            //        WHERE u.PostId IN ({postIds}) AND (u.UserId = {userId})";
            //    var savedPostIds = await _readDbConnection.QueryAsync<int>(postVotesQuery);

            //    foreach (var sp in savedPostIds)
            //    {
            //        dict[sp].IsSaved = true;
            //    }
            //}

            //posts = dict != null ? dict.Values.ToList() : posts;  

            var query = _postsRepository
                .AllAsNoTracking();

            if (Enum.TryParse(request.Sort, out Order sorter))
            {
                switch (sorter)
                {
                    case Order.New:

                    case Order.Old:

                        query = query.CreatedOnSort(sorter);
                        break;
                    case Order.Top:
                        if (Enum.TryParse(request.Top, out Interval topSorter))
                        {
                            query = query.ScoreSort<Post, PostVote>(topSorter);
                        }
                        break;
                    default:
                        break;
                }
            }

            if (request.ForumId != null)
            {
                query = query.Where(p => p.ForumId == request.ForumId);
            }

            //if (request.User != null)
            //{
            //    var id = await _usersRepository
            //        .AllAsNoTracking()
            //        .Where(u => u.UserName == request.User)
            //        .Select(u => u.Id)
            //        .SingleOrDefaultAsync();

            //    if (id != null)
            //    {
            //        query = query.Where(p => p.CreatorId == id);
            //    }
            //}

            if (request.Cursor != null)
            {
                var id = (int)request.Cursor;
                query = query.Where(p => p.Id > id);
            }

            //if (request.Top != null)
            //{
            //    query = query.OrderByDescending(x => x.Votes.Sum(v => (int)v.Type));
            //}

            var posts = await query
                .Take(PageSize)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            //var userId = _authUserService.UserId;

            //if (userId != null)
            //{
            //    var postIds = posts
            //        .Select(p => p.Id)
            //        .ToList();

            //    var votesInPosts = await _postVotesRepository
            //        .AllAsNoTracking()
            //        .Where(pv => postIds.Contains(pv.PostId) && pv.CreatorId == userId)
            //        .Select(pv => new { pv.Id, pv.PostId, pv.Type })
            //        .ToListAsync();

            //    var savedPosts = await _savesRepository
            //        .AllAsNoTracking()
            //        .Where(s => postIds.Contains(s.PostId) && s.UserId == userId)
            //        .Select(s => s.PostId)
            //        .ToListAsync();

            //    foreach (var post in posts)
            //    {
            //        var postVote = votesInPosts.SingleOrDefault(v => v.PostId == post.Id);
            //        post.VoteId = postVote?.Id;
            //        post.VoteType = postVote?.Type.ToString().ToLower();
            //        post.IsSaved = savedPosts.Contains(post.Id);
            //    }
            //}

            var response = new PagedResponse<GetAllPostsResponse>
            {
                Data = new GetAllPostsResponse { Posts = posts },
                Cursor = posts.Count > 0 ? posts[posts.Count - 1].Id : default(int?)
            };

            return response;
        }
    }
}


//SELECT p.Id,
//       p.Title,
//       p.Content,
//       p.CreatedOn,
//       p.ModifiedOn,
//       u.UserName               AS CreatorUserName,
//       f.Title                  AS ForumTitle,
//       p.ForumId,
//       pm.Url                   AS MediaUrl,
//       (SELECT Count(*)
//        FROM   Comments AS c
//        WHERE  p.Id = c.PostId) AS CommentsCount,
//       (SELECT Sum(Cast(p.Type AS int))
//        FROM   PostVotes AS p
//        WHERE  p.Id = p.PostId) AS VotesScore
//FROM   (SELECT TOP(10) ip.Id,
//                       ip.Title,
//                       ip.Content,
//                       ip.CreatedOn,
//                       ip.ModifiedOn,
//                       ip.ForumId,
//                       ip.CreatorId
//        FROM   Posts AS ip
//        WHERE  ( ip.ForumId = 2 )
//               AND ( ip.Id > 20 )
//        ORDER  BY ip.CreatedOn DESC) AS p
//       INNER JOIN AspNetUsers AS u
//               ON p.CreatorId = u.Id
//       INNER JOIN Forums AS f
//               ON p.ForumId = f.Id
//       LEFT JOIN PostMedias AS pm
//              ON p.Id = pm.PostId 


//SELECT p.Id,
//       p.Title,
//       p.Content,
//       p.CreatedOn,
//       p.ModifiedOn,
//       u.UserName               AS CreatorUserName,
//       p.ForumId,
//       f.Title                  AS ForumTitle,
//       pm.Url                   AS MediaUrl,
//       (SELECT Count(*)
//        FROM   Comments AS c
//        WHERE  p.Id = c.PostId) AS CommentsCount,
//       p.VotesScore
//FROM   (SELECT TOP(10) sp.Id,
//                       sp.Content,
//                       sp.CreatedOn,
//                       sp.CreatorId,
//                       sp.ForumId,
//                       sp.ModifiedOn,
//                       sp.Title,
//                       (SELECT Sum(Cast(pv.Type AS int))
//                        FROM   PostVotes AS pv
//                        WHERE  sp.Id = pv.PostId) AS VotesScore
//        FROM   Posts AS sp
//        WHERE  ( ( sp.CreatedOn >= '' )
//                 AND ( sp.ForumId = 2 ) )
//               AND ( sp.Id > 20 )
//        ORDER  BY VotesScore DESC) AS p
//       INNER JOIN AspNetUsers AS u
//               ON p.CreatorId = u.Id
//       INNER JOIN Forums AS f
//               ON p.ForumId = f.Id
//       LEFT JOIN PostMedias AS pm
//              ON p.Id = pm.PostId 