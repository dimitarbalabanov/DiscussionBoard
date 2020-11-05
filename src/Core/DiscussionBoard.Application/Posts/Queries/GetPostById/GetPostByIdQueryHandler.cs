﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Posts.Queries.GetPostById
{
    public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, GetPostByIdResponse>
    {
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetPostByIdQueryHandler(
            IRepository<Post> postsRepository,
            IRepository<PostVote> postVotesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _postVotesRepository = postVotesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<GetPostByIdResponse> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var response = await _postsRepository
                .AllAsNoTracking()
                .Include(p => p.Votes)
                .ThenInclude(pv => pv.Vote)
                .Where(p => p.Id == request.Id)
                .ProjectTo<GetPostByIdResponse>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            if (response == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var userId = _authUserService.UserId;
            if (userId != null)
            {
                var postVote = await _postVotesRepository
                    .AllAsNoTracking()
                    .Include(pv => pv.Vote)
                    .SingleOrDefaultAsync(pv => pv.PostId == request.Id && pv.Vote.CreatorId == userId);

                if (postVote != null)
                {
                    response.CurrentUserVoteId = postVote.VoteId;
                    response.CurrentUserVoteType = postVote.Vote.Type.ToString().ToLower();
                }
            }

            return response;
        }
    }
}
