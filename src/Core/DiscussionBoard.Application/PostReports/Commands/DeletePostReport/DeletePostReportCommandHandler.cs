using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.PostReports.Commands.DeletePostReport
{
    class DeletePostReportCommandHandler : IRequestHandler<DeletePostReportCommand>
    {
        private readonly IRepository<PostReport> _postReportsRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeletePostReportCommandHandler(
            IRepository<PostReport> postReportsRepository,
            IAuthenticatedUserService authUserService)
        {
            _postReportsRepository = postReportsRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeletePostReportCommand request, CancellationToken cancellationToken)
        {
            var report = await _postReportsRepository
                .All()
                .SingleOrDefaultAsync(r => r.Id == request.PostReportId);

            if (report == null)
            {
                throw new NotFoundException(nameof(PostReport));
            }

            if (report.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _postReportsRepository.Delete(report);
            await _postReportsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
