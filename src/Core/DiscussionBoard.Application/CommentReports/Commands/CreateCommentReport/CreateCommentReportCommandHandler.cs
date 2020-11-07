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

namespace DiscussionBoard.Application.CommentReports.Commands.CreateCommentReport
{
    public class CreateCommentReportCommandHandler : IRequestHandler<CreateCommentReportCommand, CreateCommentReportCommandResponse>
    {
        private readonly IRepository<CommentReport> _commentReportsRepository;
        private readonly IRepository<Rule> _rulesRepository;
        private readonly IRepository<Comment> _commentsRepository;
        private readonly IAuthenticatedUserService _authUserService;
        private readonly IMapper _mapper;

        public CreateCommentReportCommandHandler(
            IRepository<CommentReport> commentReportsRepository,
            IRepository<Rule> rulesRepository,
            IRepository<Comment> commentsRepository,
            IAuthenticatedUserService authUserService,
            IMapper mapper)
        {
            _commentReportsRepository = commentReportsRepository;
            _rulesRepository = rulesRepository;
            _commentsRepository = commentsRepository;
            _authUserService = authUserService;
            _mapper = mapper;
        }

        public async Task<CreateCommentReportCommandResponse> Handle(CreateCommentReportCommand request, CancellationToken cancellationToken)
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

            if (await _commentsRepository.AllAsNoTracking().SingleOrDefaultAsync(c => c.Id == request.CommentId) == null)
            {
                throw new NotFoundException(nameof(Comment));
            }

            var report = new CommentReport
            {
                Id = new Guid().ToString(),
                CreatorId = _authUserService.UserId,
                CommentId = request.CommentId,
                Type = Enum.Parse<ReportType>(request.Type, true)
            };

            await _commentReportsRepository.AddAsync(report);
            await _commentReportsRepository.SaveChangesAsync();

            var response = _mapper.Map<CreateCommentReportCommandResponse>(report);
            return response;
        }
    }
}
