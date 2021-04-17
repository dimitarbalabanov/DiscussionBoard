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

namespace DiscussionBoard.Application.Comments.Queries.GetAllComments
{
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, GetAllCommentsResponse>
    {
        private const int PageSize = 10;

        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<CommentVote> _commentVotesRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IMapper _mapper;

        public GetAllCommentsQueryHandler(
            IRepository<Comment> commentsRepository, 
            IRepository<CommentVote> commentVotesRepository,
            IAuthenticatedUserService userService,
            IMapper mapper)
        {
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _commentVotesRepository = commentVotesRepository ?? throw new ArgumentNullException(nameof(commentVotesRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<GetAllCommentsResponse> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var commentsQuery = _commentsRepository.AllAsNoTracking()
                .Where(c => c.PostId == request.PostId);

            commentsQuery = commentsQuery.Sort(request.Sort, request.Top, request.Cursor);
            commentsQuery = commentsQuery.Take(PageSize);

            var comments = await commentsQuery
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();

            var userId = _userService.UserId;
            Dictionary<int, CommentDto> dict = null;
            if (userId != null)
            {
                dict = comments.ToDictionary(x => x.Id, x => x);
                var ids = dict.Keys.ToArray();

                var votes = await _commentVotesRepository
                    .AllAsNoTracking()
                    .Where(v => ids.Contains(v.CommentId) && v.CreatorId == userId)
                    .ProjectTo<CommentVoteDto>(_mapper.ConfigurationProvider)
                    .ToArrayAsync();

                if (votes.Length > 0)
                {
                    foreach (var v in votes)
                    {
                        dict[v.CommentId].VoteId = v.Id;
                        dict[v.CommentId].VoteType = v.Type;
                    }
                }

                if (dict != null)
                {
                    comments = dict.Values.ToArray();
                }
            }

            var response =  new GetAllCommentsResponse { Comments = comments };
            return response;
        }
    }
}