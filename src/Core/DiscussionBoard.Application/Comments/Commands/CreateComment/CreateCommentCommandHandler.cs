﻿using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Comments.Commands.CreateComment
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CreateCommentCommandResponse>
    {
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;
        public CreateCommentCommandHandler(
            IRepository<Comment> commentsRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {   
            _commentsRepository = commentsRepository ?? throw new ArgumentNullException(nameof(commentsRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreateCommentCommandResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = _mapper.Map<Comment>(request);
            comment.CreatorId = _authUserService.UserId;

            await _commentsRepository.AddAsync(comment);
            await _commentsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentCommandResponse>(comment);
            return response;
        }
    }
}
