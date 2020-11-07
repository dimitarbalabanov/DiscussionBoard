using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.PostVotes.Commands.UpdatePostVote
{
    class UpdatePostVoteCommandHandler : IRequestHandler<UpdatePostVoteCommand>
    {
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public UpdatePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository,
            IAuthenticatedUserService authUserService)
        {
            _postVotesRepository = postVotesRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(UpdatePostVoteCommand request, CancellationToken cancellationToken)
        {
            var postVote = await _postVotesRepository
               .All()
               .SingleOrDefaultAsync(v => v.Id == request.PostVoteId);

            if (postVote == null)
            {
                throw new NotFoundException(nameof(PostVote));
            }

            if (postVote.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            postVote.Type = Enum.Parse<VoteType>(request.Type, true);
            await _postVotesRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
