using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Scores.Queries.GetPostsVotesScores
{
    class GetPostsVotesScoresQueryHandler : IRequestHandler<GetPostsVotesScoresQuery, List<PostsVotesScores>>
    {
        private readonly IRepository<PostsVotesScores> _repository;

        public GetPostsVotesScoresQueryHandler(IRepository<PostsVotesScores> repository)
        {
            _repository = repository;
        }
        public async Task<List<PostsVotesScores>> Handle(GetPostsVotesScoresQuery request, CancellationToken cancellationToken)
        {




            var result = await _repository.AllAsNoTracking().ToListAsync();
            return result;
        }
    }
}
