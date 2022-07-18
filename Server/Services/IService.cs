using System.Linq.Expressions;

namespace Server.Services
{
    public interface IService<T>
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, bool>> filter);
        T? GetOne(int id);
        T Create(T item);
        void Delete(int id);
        T Update(T item);
    }
}
