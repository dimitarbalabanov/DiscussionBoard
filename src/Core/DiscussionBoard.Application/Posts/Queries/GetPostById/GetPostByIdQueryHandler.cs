using AutoMapper;
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
        private readonly IApplicationReadDbConnection _readDbConnection;
        private readonly IRepository<Post> _postsRepository;
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<UserPostSave> _savesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public GetPostByIdQueryHandler(
            IApplicationReadDbConnection readDbConnection,
            IRepository<Post> postsRepository,
            IRepository<PostVote> postVotesRepository,
            IRepository<UserPostSave> savesRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postsRepository = postsRepository;
            _postVotesRepository = postVotesRepository;
            _savesRepository = savesRepository;
            _authUserService = authUserService;
            _mapper = mapper;
            _readDbConnection = readDbConnection;
        }

        public async Task<GetPostByIdResponse> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            var userId = _authUserService.UserId;
            var postQuery = $@"SELECT TOP(1) (SELECT Count(*)
                                              FROM   Comments AS c
                                              WHERE  p0.Id = c.PostId) AS CommentsCount,
                                             p0.Content,
                                             p0.CreatedOn,
                                             a.UserName                AS CreatorUserName,
                                             p0.ForumId,
                                             f.Title                   AS ForumTitle,
                                             p0.Id,
                                             p1.Url                    AS MediaUrl,
                                             p0.ModifiedOn,
                                             (SELECT Sum(Cast(p.Type AS int))
                                              FROM   PostVotes AS p
                                              WHERE  p0.Id = p.PostId) AS Score,
                                             p0.Title
                             FROM   Posts AS p0
                                    INNER JOIN AspNetUsers AS a
                                            ON p0.CreatorId = a.Id
                                    INNER JOIN Forums AS f
                                            ON p0.ForumId = f.Id
                                     LEFT JOIN PostMedias AS p1
                                            ON p0.Id = p1.PostId
                             WHERE  p0.Id = {request.PostId}";

            var post = await _readDbConnection.QueryFirstOrDefaultAsync<GetPostByIdResponse>(postQuery);
            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            if (userId != null)
            {
                var postVoteQuery =
                    $@"SELECT pv.Id,
                              pv.Type
                       FROM   PostVotes AS pv
                       WHERE  pv.PostId = {post.Id}
                              AND p.CreatorId = {userId}";
                var vote = await _readDbConnection.QueryFirstOrDefaultAsync<PostVoteDto>(postVoteQuery);

                var savedPostQuery =
                    $@"SELECT ups.Id,
                       FROM   UserPostSaves AS ups
                       WHERE  ups.PostId = {post.Id}
                              AND ups.CreatorId = {userId}";
                var savedPost = await _readDbConnection.QueryFirstOrDefaultAsync<int?>(savedPostQuery);

                post.IsSaved = savedPost != null;
                post.VoteId = vote?.Id;
                post.VoteType = vote?.Type;
            }

            return post;

            //var response = await _postsRepository
            //    .AllAsNoTracking()
            //    .Where(p => p.Id == request.PostId)
            //    .ProjectTo<GetPostByIdResponse>(_mapper.ConfigurationProvider)
            //    .FirstOrDefaultAsync();

            //if (response == null)
            //{
            //    throw new NotFoundException(nameof(Post));
            //}

            //var userId = _authUserService.UserId;
            //if (userId != null)
            //{
            //    var postVote = await _postVotesRepository
            //        .AllAsNoTracking()
            //        .SingleOrDefaultAsync(pv => pv.PostId == request.PostId && pv.CreatorId == userId);

            //    if (postVote != null)
            //    {
            //        response.VoteId = postVote.Id;
            //        response.VoteType = postVote.Type.ToString().ToLower();
            //    }

            //    var save = await _savesRepository
            //        .AllAsNoTracking()
            //        .SingleOrDefaultAsync(s => s.PostId == request.PostId && s.UserId == userId);

            //    if (save != null)
            //    {
            //        response.IsSaved = true;
            //    }
            //}

            //return response;
        }
    }
}
