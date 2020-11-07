using DiscussionBoard.Web.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace DiscussionBoard.Web.Hubs
{
    public class ChatHub : Hub<IChatClient>
    { }
}