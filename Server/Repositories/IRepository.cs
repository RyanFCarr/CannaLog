namespace Server.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T? GetOne(int id);
        T Create(T item);
        void Delete(int id);
        T Update(T item);
    }
}
