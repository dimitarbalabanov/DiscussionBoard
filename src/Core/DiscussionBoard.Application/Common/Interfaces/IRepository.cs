using System;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Application.Common.Interfaces
{
    public interface IRepository<TEntity> : IDisposable
        where TEntity : class
    {
        ValueTask<TEntity> FindAsync(int id);

        IQueryable<TEntity> All();

        IQueryable<TEntity> AllAsNoTracking();

        Task AddAsync(TEntity entity);

        void Update(TEntity entity);

        void Delete(TEntity entity);

        Task<int> SaveChangesAsync();
    }
}
