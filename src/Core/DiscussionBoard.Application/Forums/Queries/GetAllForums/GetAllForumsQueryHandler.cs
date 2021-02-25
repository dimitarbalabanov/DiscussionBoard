using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Forums.Queries.GetAllForums
{
    public class GetAllForumsQueryHandler : IRequestHandler<GetAllForumsQuery, GetAllForumsResponse>
    {
        private readonly IApplicationReadDbConnection _readDbConnection;

        public GetAllForumsQueryHandler(IApplicationReadDbConnection readDbConnection)
        {
            _readDbConnection = readDbConnection ?? throw new System.ArgumentNullException(nameof(readDbConnection));
        }

        public async Task<GetAllForumsResponse> Handle(GetAllForumsQuery request, CancellationToken cancellationToken)
        {
            var forumsQuery = new StringBuilder();
            forumsQuery.AppendLine("SELECT");
            forumsQuery.AppendLine("  f.Id,");
            forumsQuery.AppendLine("  f.Title,");
            forumsQuery.AppendLine("  fm.Url AS MediaUrl");
            forumsQuery.AppendLine("FROM");
            forumsQuery.AppendLine("  Forums AS f");
            forumsQuery.AppendLine("  LEFT JOIN ForumMedias AS fm");
            forumsQuery.AppendLine("  ON f.Id = fm.ForumId");

            var forums = await _readDbConnection.QueryAsync<ForumDto>(forumsQuery.ToString());
            var response = new GetAllForumsResponse { Forums = forums };
            return response;
        }
    }
}

            //var forumsQuery = @"SELECT 
            //                      f.Id, 
            //                      fm.Url AS MediaUrl, 
            //                      f.Title 
            //                    FROM 
            //                      Forums AS f 
            //                      LEFT JOIN ForumMedias AS fm ON f.Id = fm.ForumId";
