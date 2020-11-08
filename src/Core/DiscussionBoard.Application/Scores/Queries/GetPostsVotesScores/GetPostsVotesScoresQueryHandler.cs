using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Scores.Queries.GetPostsVotesScores
{
    public class GetPostsVotesScoresQueryHandler : IRequestHandler<GetPostsVotesScoresQuery>
    {
        //private readonly IRepository<PostsVotesScores> _repository;

        //public GetPostsVotesScoresQueryHandler(IRepository<PostsVotesScores> repository)
        //{
        //    _repository = repository;
        //}
        public Task<Unit> Handle(GetPostsVotesScoresQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
