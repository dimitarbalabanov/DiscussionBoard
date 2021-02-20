using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Helpers;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.PostVotes.Commands.DeletePostVote
{
    public class DeletePostVoteCommandHandler : IRequestHandler<DeletePostVoteCommand>
    {
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IIdentityService _identityService;

        public DeletePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository,
            IAuthenticatedUserService authUserService,
            IIdentityService identityService)
        {
            _postVotesRepository = postVotesRepository ?? throw new ArgumentNullException(nameof(postVotesRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
        }

        public async Task<Unit> Handle(DeletePostVoteCommand request, CancellationToken cancellationToken)
        {
            var postVote = await _postVotesRepository
                .All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            if (postVote == null)
            {
                throw new NotFoundException(nameof(PostVote));
            }

            if (!await AuthorizationAccessHelper.HasPermissionToAccessAsync(_authUserService.UserId, postVote.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            _postVotesRepository.Delete(postVote);
            await _postVotesRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
