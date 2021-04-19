using AutoMapper;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommandHandler : IRequestHandler<CreateForumCommand, CreateForumCommandResponse>
    {
        private readonly IRepository<Forum> _forumsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        public CreateForumCommandHandler(
            IRepository<Forum> forumsRepository,
            IAuthenticatedUserService authUserService,
            IMediaService mediaService,
            IMapper mapper)
        {
            _forumsRepository = forumsRepository ?? throw new ArgumentNullException(nameof(forumsRepository));
            _authUserService = authUserService ?? throw new ArgumentNullException(nameof(authUserService));
            _mediaService = mediaService ?? throw new ArgumentNullException(nameof(mediaService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreateForumCommandResponse> Handle(CreateForumCommand request, CancellationToken cancellationToken)
        {
            var forum = _mapper.Map<Forum>(request);
            forum.CreatorId = _authUserService.UserId;

            if (request.ForumMedia != null)
            {
                var uploadResult = await _mediaService.UploadImageAsync(request.ForumMedia);
                forum.Media = new ForumMedia
                {
                    Url = uploadResult.AbsoluteUri,
                    PublicId = uploadResult.PublicId
                };
            }

            await _forumsRepository.AddAsync(forum);
            await _forumsRepository.SaveChangesAsync();

            return _mapper.Map<CreateForumCommandResponse>(forum);
        }
    }
}
