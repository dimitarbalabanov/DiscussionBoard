using AutoMapper;
using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CreateCommentCommandResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _userService;
        private readonly IMapper _mapper;

        public CreateCommentCommandHandler(
            IRepository<Comment> commentsRepository,
            IRepository<Post> postsRepository,
            IAuthenticatedUserService userService,
            IMapper mapper)
        {
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _postsRepository = postsRepository ?? throw new ArgumentNullException(nameof(postsRepository));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreateCommentCommandResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
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

            var comment = _mapper.Map<Comment>(request);
            comment.CreatorId = _userService.UserId;

            await _commentsRepository.AddAsync(comment);
            await _commentsRepository.SaveChangesAsync();

            post.CommentsCount++;

            _postsRepository.Update(post);
            await _postsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentCommandResponse>(comment);
            return response;
        }
    }
}
