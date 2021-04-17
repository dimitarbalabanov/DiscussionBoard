using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, GetAllPostsResponse>
    {
        private const int PageSize = 10;

        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<UserPostSave> _savedPostsRepository;
        private readonly IMapper _mapper;


        public GetAllPostsQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IAuthenticatedUserService authUserService, IRepository<Post> postsRepository, IRepository<PostVote> postVotesRepository, IMapper mapper, IRepository<UserPostSave> savedPostsRepository)
        {
            _readDbConnection = readDbConnection;
            _authUserService = authUserService;
            _postsRepository = postsRepository;
            _postVotesRepository = postVotesRepository;
            _mapper = mapper;
            _savedPostsRepository = savedPostsRepository;
        }

        public async Task<GetAllPostsResponse> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var postsQuery = _postsRepository.AllAsNoTracking();

            if (request.ForumId != null)
            {
                postsQuery.Where(p => p.ForumId == request.ForumId);
            }

            postsQuery = postsQuery.Sort(request.Sort, request.Top, request.Cursor);
            postsQuery = postsQuery.Take(PageSize);

            var posts = await postsQuery
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();

            var userId = _authUserService.UserId;
            Dictionary<int, PostDto> dict = null;
            if (userId != null)
            {
                dict = posts.ToDictionary(x => x.Id, x => x);
                var ids = dict.Keys.ToArray();

                var votes = await _postVotesRepository
                    .AllAsNoTracking()
                    .Where(v => ids.Contains(v.PostId) && v.CreatorId == userId)
                    .ProjectTo<AllPostsPostVoteDto>(_mapper.ConfigurationProvider)
                    .ToArrayAsync();

                var saves = await _savedPostsRepository.AllAsNoTracking()
                    .Where(s => ids.Contains(s.PostId) && s.UserId == userId)
                    .Select(s => s.PostId)
                    .ToArrayAsync();

                if (votes.Length > 0)
                {
                    foreach (var v in votes)
                    {
                        dict[v.PostId].VoteId = v.Id;
                        dict[v.PostId].VoteType = v.Type;
                    }
                }

                if (saves.Length > 0)
                {
                    foreach (var v in saves)
                    {
                        dict[v].IsSaved = true;
                    }
                }

                if (dict != null)
                {
                    posts = dict.Values.ToArray();
                }
            }

            var response = new GetAllPostsResponse { Posts = posts };
            return response;
        }
    }
}