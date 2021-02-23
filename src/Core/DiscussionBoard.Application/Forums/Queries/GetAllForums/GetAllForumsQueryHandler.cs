using DiscussionBoard.Application.Common.Interfaces;
using MediatR;
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
            var forumsQuery = @"SELECT 
                                  f.Id, 
                                  fm.Url AS MediaUrl, 
                                  f.Title 
                                FROM 
                                  Forums AS f 
                                  LEFT JOIN ForumMedias AS fm ON f.Id = fm.ForumId";
            var forums = await _readDbConnection.QueryAsync<ForumDto>(forumsQuery);
            var response = new GetAllForumsResponse { Forums = forums };
            return response;
        }
    }
}
