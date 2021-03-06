﻿using DiscussionBoard.Application.Common.Exceptions;
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
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IIdentityService _identityService;

        public DeletePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository,
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IIdentityService identityService)
        {
            _postVotesRepository = postVotesRepository ?? throw new ArgumentNullException(nameof(postVotesRepository));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
        }

        public async Task<Unit> Handle(DeletePostVoteCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var postVote = await _postVotesRepository.All()
                .SingleOrDefaultAsync(v => v.Id == request.Id);

            if (postVote == null)
            {
                throw new NotFoundException(nameof(PostVote));
            }

            if (!await AuthorizationAccess.HasPermissionAsync(_userService.UserId, postVote.CreatorId, _identityService))
            {
                throw new ForbiddenException();
            }

            _postVotesRepository.Delete(postVote);
            await _postVotesRepository.SaveChangesAsync();

            var post = await _postsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == postVote.PostId);

            post.VotesScore -= (int)postVote.Type;

            _postsRepository.Update(post);
            await _postsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
