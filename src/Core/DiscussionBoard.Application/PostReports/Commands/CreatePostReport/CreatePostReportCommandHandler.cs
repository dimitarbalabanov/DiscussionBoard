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

namespace DiscussionBoard.Application.PostReports.Commands.CreatePostReport
{
    class CreatePostReportCommandHandler : IRequestHandler<CreatePostReportCommand, CreatePostReportCommandResponse>
    {
        private readonly IRepository<PostReport> _postReportsRepository;
        private readonly IRepository<Rule> _rulesRepository;
        private readonly IRepository<Post> _postsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreatePostReportCommandHandler(
            IRepository<PostReport> postReportsRepository,
            IRepository<Rule> rulesRepository,
            IRepository<Post> postsRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _postReportsRepository = postReportsRepository;
            _rulesRepository = rulesRepository;
            _postsRepository = postsRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<CreatePostReportCommandResponse> Handle(CreatePostReportCommand request, CancellationToken cancellationToken)
        {
            var type = Enum.Parse<ReportType>(request.Type, true);
            if (type != ReportType.RuleBreaker && request.RuleId != null)
            {
                throw new BadRequestException(nameof(ReportType.RuleBreaker));
            }

            if (type == ReportType.RuleBreaker)
            {
                if (request.RuleId == null)
                {
                    throw new BadRequestException(nameof(ReportType.RuleBreaker));
                }

                if (await _rulesRepository.AllAsNoTracking().SingleOrDefaultAsync(r => r.Id == (int)request.RuleId) == null)
                {
                    throw new NotFoundException(nameof(Rule));
                }
            }

            if (await _postsRepository.AllAsNoTracking().SingleOrDefaultAsync(c => c.Id == request.PostId) == null)
            {
                throw new NotFoundException(nameof(Post));
            }

            var report = new PostReport
            {
                Id = new Guid().ToString(),
                CreatorId = _authUserService.UserId,
                PostId = request.PostId,
                Type = Enum.Parse<ReportType>(request.Type, true)
            };

            await _postReportsRepository.AddAsync(report);
            await _postReportsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreatePostReportCommandResponse>(report);
            return response;
        }
    }
}
