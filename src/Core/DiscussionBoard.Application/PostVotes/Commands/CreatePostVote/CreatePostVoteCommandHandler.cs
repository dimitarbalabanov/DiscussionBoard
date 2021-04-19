using AutoMapper;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using DiscussionBoard.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.PostVotes.Commands.CreatePostVote
{
    public class CreatePostVoteCommandHandler : IRequestHandler<CreatePostVoteCommand, CreatePostVoteCommandResponse>
    {
        private readonly IRepository<PostVote> _postVotesRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IMapper _mapper;

        public CreatePostVoteCommandHandler(
            IRepository<PostVote> postVotesRepository, 
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IMapper mapper)
        {
            _postVotesRepository = postVotesRepository ?? throw new ArgumentNullException(nameof(postVotesRepository));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreatePostVoteCommandResponse> Handle(CreatePostVoteCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var post = await _postsRepository.All()
                .SingleOrDefaultAsync(p => p.Id == request.PostId);

            if (post == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var userId = _userService.UserId;
            var hasVoted = await _postVotesRepository.AllAsNoTracking()
                   .AnyAsync(pv => pv.PostId == request.PostId && pv.CreatorId == userId);

            if (hasVoted)
            {
                throw new BadRequestException("User has already voted");
            }

            var postVote = _mapper.Map<PostVote>(request);
            postVote.CreatorId = userId;

            await _postVotesRepository.AddAsync(postVote);
            await _postVotesRepository.SaveChangesAsync();

            post.VotesScore += (int)postVote.Type;

            _postsRepository.Update(post);
            await _postsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreatePostVoteCommandResponse>(postVote);
            return response;
        }
    }
}
