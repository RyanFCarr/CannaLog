namespace Server.Services
{
    public interface IService<T>
    {
        IEnumerable<T> GetAll();
        T? GetOne(int id);
        T Create(T item);
        void Delete(int id);
        T Update(T item);
    }
}
