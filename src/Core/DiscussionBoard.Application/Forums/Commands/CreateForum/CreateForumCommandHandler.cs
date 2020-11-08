using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Commands.CreateForum
{
    public class CreateForumCommandHandler : IRequestHandler<CreateForumCommand, CreateForumCommandResponse>
    {
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IRepository<Forum> _forumsRepository;

        public CreateForumCommandHandler(IRepository<Forum> forumsRepository, IAuthenticatedUserService authUserService)
        {
            _forumsRepository = forumsRepository;
            _authUserService = authUserService;
        }

        public async Task<CreateForumCommandResponse> Handle(CreateForumCommand request, CancellationToken cancellationToken)
        {
            var forum = new Forum
            {
                //upload img
                Image = new ForumMedia { Url = "dsadsadsadsa", PublicId = "3214324" },
                Color = request.Color,
                CreatorId = _authUserService.UserId,
                Description = request.Description,
                Title = request.Title,
                Rules = request.Rules.Select(r => new Rule { Description = r }).ToList(),
            };

            await _forumsRepository.AddAsync(forum);
            await _forumsRepository.SaveChangesAsync();

            return new CreateForumCommandResponse { ForumId = forum.Id };
        }
    }
}
