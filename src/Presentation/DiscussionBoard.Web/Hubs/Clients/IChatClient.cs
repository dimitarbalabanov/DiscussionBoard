using DiscussionBoard.Web.Hubs.Models;
using System.Threading.Tasks;

namespace DiscussionBoard.Web.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}