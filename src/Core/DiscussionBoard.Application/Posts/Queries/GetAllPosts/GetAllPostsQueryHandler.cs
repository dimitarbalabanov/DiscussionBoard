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
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PagedResponse<GetAllPostsResponse>>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<UserSavedPost> _savesRepository;
        private readonly IRepository<User> _usersRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;
        private const int PageSize = 10;

        public GetAllPostsQueryHandler(
            IRepository<Post> postsRepository,
            IRepository<PostVote> postVotesRepository,
            IRepository<UserSavedPost> savesRepository,
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
        }

        public async Task<PagedResponse<GetAllPostsResponse>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var query = _postsRepository
                .AllAsNoTracking();

            if (Enum.TryParse(request.Sort, out Sorter sorter))
            {
                if (sorter == Sorter.Top)
                {
                    if (Enum.TryParse(request.Order, out TopSorter date))
                    {

                    }
                }
            }

            query = query.OrderByDescending(x => x.Votes.Sum(v => (int)v.Type));

            if (request.ForumId != null)
            {
                query = query.Where(p => p.ForumId == request.ForumId);
            }

            if (request.Cursor != null)
            {
                var id = (int)request.Cursor;
                query = query.Where(p => p.Id > id);
            }

            var posts = await query
                .Take(PageSize)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                var asdf = _usersRepository
                    .AllAsNoTracking()
                    .Where(u => u.Id == userId);

                var postIds = posts
                    .Select(p => p.Id)
                    .ToList();

                var votesInPosts = await _postVotesRepository
                    .AllAsNoTracking()
                    .Where(pv => postIds.Contains(pv.PostId) && pv.CreatorId == userId)
                    .ToListAsync();

                var savedPosts = await _savesRepository
                    .AllAsNoTracking()
                    .Where(s => postIds.Contains(s.PostId) && s.UserId == userId)
                    .ToListAsync();

                foreach (var post in posts)
                {
                    var postVote = votesInPosts.SingleOrDefault(v => v.PostId == post.Id);
                    if (postVote != null)
                    {
                        post.VoteId = postVote.Id;
                        post.VoteType = postVote.Type.ToString().ToLower();
                    }

                    var save = savedPosts.SingleOrDefault(s => s.PostId == post.Id);
                    if (save != null)
                    {
                        post.IsSaved = true;
                    }
                }
            }

            var response = new PagedResponse<GetAllPostsResponse>
            {
                Data = new GetAllPostsResponse { Posts = posts },
                Cursor = posts.Count > 0 ? posts[posts.Count - 1].Id : default(int?)
            };

            return response;
        }
    }
}

    //SELECT(
    //    SELECT COUNT(*)
    //    FROM[Comments] AS[c]
    //    WHERE[p0].[Id] = [c].[PostId]) AS[CommentsCount], [p0].[CreatedOn], [a].[UserName] AS[CreatorUserName], [p0].[ForumId], [f].[Title] AS[ForumTitle], [p0].[Id], [p0].[ModifiedOn], [p0].[Title], (
    //SELECT SUM(CAST([v].[Type] AS int))
    //    FROM[PostsVotes] AS[p]
    //    INNER JOIN[Votes] AS [v] ON[p].[VoteId] = [v].[Id]
    //    WHERE[p0].[Id] = [p].[PostId]) AS[VotesScore]
    //FROM[Posts] AS[p0]
    //LEFT JOIN[AspNetUsers] AS [a] ON[p0].[CreatorId] = [a].[Id]
    //INNER JOIN[Forums] AS [f] ON[p0].[ForumId] = [f].[Id]
    //WHERE[p0].[CreatedOn] > DATEADD(day, CAST(-30.0E0 AS int), GETUTCDATE())
    //ORDER BY[VotesScore]