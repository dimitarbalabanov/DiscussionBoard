using DiscussionBoard.Application.Common.Exceptions;
using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.CommentReports.Commands.DeleteCommentReport
{
    public class DeleteCommentReportCommandHandler : IRequestHandler<DeleteCommentReportCommand>
    {
        private readonly IRepository<CommentReport> _commentReportsRepository;
        private readonly IAuthenticatedUserService _authUserService;

        public DeleteCommentReportCommandHandler(
            IRepository<CommentReport> commentReportsRepository,
            IAuthenticatedUserService authUserService)
        {
            _commentReportsRepository = commentReportsRepository;
            _authUserService = authUserService;
        }

        public async Task<Unit> Handle(DeleteCommentReportCommand request, CancellationToken cancellationToken)
        {
            var report = await _commentReportsRepository
                .All()
                .SingleOrDefaultAsync(r => r.Id == request.CommentReportId);

            if (report == null)
            {
                throw new NotFoundException(nameof(CommentReport));
            }

            if (report.CreatorId != _authUserService.UserId)
            {
                throw new UnauthorizedException();
            }

            _commentReportsRepository.Delete(report);
            await _commentReportsRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
