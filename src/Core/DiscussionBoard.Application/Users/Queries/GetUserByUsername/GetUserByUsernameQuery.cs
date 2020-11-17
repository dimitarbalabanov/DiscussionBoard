using MediatR;

namespace DiscussionBoard.Application.Users.Queries.GetUserByUsername
{
    public class GetUserByUsernameQuery : IRequest<GetUserByUsernameQueryResponse>
    {
        public string UserName { get; set; }
    }
}
