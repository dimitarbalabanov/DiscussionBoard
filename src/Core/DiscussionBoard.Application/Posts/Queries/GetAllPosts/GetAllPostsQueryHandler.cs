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

            //to do params
            var postsQueryBuilder = new StringBuilder();
            postsQueryBuilder.Append(
                @"SELECT (
                    SELECT COUNT(*)
                    FROM Comments AS c
                    WHERE p.Id = c.PostId) AS CommentsCount,");

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                postsQueryBuilder.Append(
                    $@"CAST(CASE WHEN p.CreatorId = {userId} THEN 1 ELSE 0 END AS BIT) AS IsCreator,");
            }

            postsQueryBuilder.Append(
                    $@"p.Content,
	                p.CreatedOn,
	                p.ForumId, 
	                p.Id,
                    p.ModifiedOn,
	                p.Title,
	                p.Score,
	                pm.Url AS MediaUrl,
	                u.UserName AS CreatorUserName,
	                f.Title AS ForumTitle
                FROM (
                    SELECT TOP({PageSize})
		                po.Id, 
		                po.Content, 
		                po.CreatedOn, 
		                po.CreatorId, 
		                po.ForumId, 
		                po.ModifiedOn, 
		                po.Title, (
		                SELECT SUM(CAST(pv.Type AS int))
		                FROM PostVotes AS pv
		                WHERE po.Id = pv.PostId) AS VotesScore
                    FROM Posts AS po");

            
            var order = Enum.Parse<Order>(request.Sort, true);
            var forumId = request.ForumId;

            if (forumId != null && order != Order.Top)
            {
                postsQueryBuilder.Append(
                    $@"WHERE po.ForumId = {forumId}");
            }

            switch (order)
            {
                case Order.New:
                    postsQueryBuilder.Append(
                        $@"ORDER BY po.CreatedOn ASC");
                    break;
                case Order.Old:
                    postsQueryBuilder.Append(
                        $@"ORDER BY po.CreatedOn DESC");
                    break;
                case Order.Top:
                    if (Enum.TryParse(request.Top, out Interval interval))
                    {
                        if (interval != Interval.AllTime)
                        {
                            var time = DateTime.UtcNow;
                            switch (interval)
                            {
                                case Interval.Today:
                                    time = time.Date;
                                    break;
                                case Interval.ThisWeek:
                                    var diff = time.DayOfWeek - DayOfWeek.Monday;
                                    diff = diff < 0 ? diff += 7 : diff;
                                    time = time.AddDays(-diff).Date;
                                    break;
                                case Interval.ThisMonth:
                                    var month = new DateTime(time.Year, time.Month, 1);
                                    break;
                                default:
                                    time = DateTime.UnixEpoch;
                                    break;
                            }

                            postsQueryBuilder.Append(
                                        $@"WHERE (po.CreatedOn >= {time:yyyy-MM-dd HH:mm:ss.fff})");

                            if (forumId != null)
                            {
                                postsQueryBuilder.Append(
                                        $@"AND (po.ForumId = {forumId})");
                            }
                        }
                        
                        postsQueryBuilder.Append(
                            $@"ORDER BY VotesScore DESC");
                    }
                    break;
                default:
                    break;
            }

            postsQueryBuilder.Append(
                $@") AS p
                INNER JOIN AspNetUsers AS u ON p.CreatorId = u.Id
                INNER JOIN Forums AS f ON p.ForumId = f.Id
                LEFT JOIN PostMedias AS pm ON p.Id = pm.PostId");

            var posts = await _readDbConnection.QueryAsync<PostDto>(postsQueryBuilder.ToString());

            Dictionary<int, PostDto> dict = null;
            if (userId != null)
            {
                dict = posts.ToDictionary(x => x.Id, x => x);
                var postIds = string.Join(", ", posts.Select(p => p.Id).ToArray());

                var postVotesQuery =
                    $@"SELECT p.Id, p.PostId, p.Type
                    FROM PostVotes AS p
                    WHERE p.PostId IN ({postIds}) AND (p.CreatorId = {userId})";
                var votes = await _readDbConnection.QueryAsync<PostVoteDto>(postVotesQuery);

                foreach (var v in votes)
                {
                    dict[v.PostId].VoteId = v.Id;
                    dict[v.PostId].VoteType = v.Type;
                }

                var savedPostsQuery =
                    $@"SELECT u.PostId
                    FROM UserPostSaves AS u
                    WHERE u.PostId IN ({postIds}) AND (u.UserId = {userId})";
                var savedPostIds = await _readDbConnection.QueryAsync<int>(postVotesQuery);

                foreach (var sp in savedPostIds)
                {
                    dict[sp].IsSaved = true;
                }
            }

            posts = dict != null ? dict.Values.ToList() : posts;  

            //var query = _postsRepository
            //    .AllAsNoTracking();

            //if (Enum.TryParse(request.Sort, out Order sorter))
            //{
            //    switch (sorter)
            //    {
            //        case Order.New:

            //        case Order.Old:

            //            query = query.CreatedOnSort(sorter);
            //            break;
            //        case Order.Top:
            //            if (Enum.TryParse(request.Top, out Interval topSorter))
            //            {
            //                query = query.ScoreSort<Post, PostVote>(topSorter);
            //            }
            //            break;
            //        default:
            //            break;
            //    }
            //}

            //if (request.ForumId != null)
            //{
            //    query = query.Where(p => p.ForumId == request.ForumId);
            //}

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

            //if (request.Cursor != null)
            //{
            //    var id = (int)request.Cursor;
            //    query = query.Where(p => p.Id > id);
            //}

            //if (request.Top != null)
            //{
            //    query = query.OrderByDescending(x => x.Votes.Sum(v => (int)v.Type));
            //}

            //var posts = await query
            //    .Take(PageSize)
            //    .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
            //    .ToListAsync();

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


