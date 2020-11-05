using AutoMapper;
using AutoMapper.QueryableExtensions;
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
using DiscussionBoard.Application.Common.Helpers;
using System.Security.Cryptography.X509Certificates;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PagedResponse<GetAllPostsResponse>>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<PostsVotesScores> _scoresRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;
        private const int PageSize = 10;

        public GetAllPostsQueryHandler(
            IRepository<Post> postsRepository,
            IRepository<PostVote> postVotesRepository,
            IRepository<PostsVotesScores> scoresRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _postVotesRepository = postVotesRepository;
            _scoresRepository = scoresRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<PagedResponse<GetAllPostsResponse>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            if (Enum.TryParse(request.Sort, out Sorter sorter))
            {
                if (sorter == Sorter.Top)
                {
                    if (Enum.TryParse(request.Order, out TopSorter date))
                    {
                        var ids = await _scoresRepository
                            .AllAsNoTracking()
                            .ScoreSort(date)
                            .Select(x => x.Id)
                            .ToListAsync();
                    }
                }
            }

            var query = _postsRepository
                .AllAsNoTracking();

            if (request.ForumId != null)
            {
                query = query.Where(p => p.ForumId == request.ForumId);
            }

            if (request.Cursor != null)
            {
                var id = (int)request.Cursor;
                query = query.Where(p => p.Id > id);
            }

            query = query
                .Include(p => p.Votes)
                .ThenInclude(pv => pv.Vote)
                .Include(p => p.Creator)
                .Include(p => p.Forum);

            //query = query.Take(PageSize);

            //var asdf = await query
            //    .Select(p => new PostDto
            //    {
            //        CreatedOn = p.CreatedOn,
            //        CreatorUserName = p.Creator.UserName,
            //        ForumId = p.Forum.Id,
            //        ForumTitle = p.Forum.Title,
            //        Id = p.Id,
            //        Title = p.Title,
            //        ModifiedOn = p.ModifiedOn,
            //        CommentsCount = p.Comments.Count(),
            //        VotesScore = p.Votes.Sum(pv => (int)pv.Vote.Type)
            //    })
            //    .OrderBy(x => x.VotesScore)
            //    .ToListAsync();

            var posts = await query
                .Take(10)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                var postIds = posts
                    .Select(p => p.Id)
                    .ToList();

                var currentUserVotesInPosts = await _postVotesRepository
                    .AllAsNoTracking()
                    .Include(pv => pv.Vote)
                    .Where(pv => postIds.Contains(pv.PostId) && pv.Vote.CreatorId == userId)
                    .ToListAsync();

                foreach (var post in posts)
                {
                    var postVote = currentUserVotesInPosts.SingleOrDefault(v => v.PostId == post.Id);
                    if (postVote != null)
                    {
                        post.CurrentUserVoteId = postVote.VoteId;
                        post.CurrentUserVoteType = postVote.Vote.Type.ToString().ToLower();
                    }
                }
            }

            var response = new PagedResponse<GetAllPostsResponse>
            {
                Data = new GetAllPostsResponse { Posts = posts },
                Cursor = posts[posts.Count - 1].Id
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