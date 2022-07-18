using Server.Models;
using Server.Repositories;
using System.Linq.Expressions;

namespace Server.Services
{
    public interface IAdditiveService : IService<Additive> { }
    public class AdditiveService : IAdditiveService
    {
        private readonly IAdditiveRepository _repo;
        public AdditiveService(IAdditiveRepository repo)
        {
            _repo = repo;
        }

        public Additive Create(Additive item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Additive> GetAll() => _repo.GetAll();

        public IEnumerable<Additive> GetAll(Expression<Func<Additive, bool>> filter) => _repo.GetAll(filter);

        public Additive? GetOne(int id)
        {
            throw new NotImplementedException();
        }

        public Additive Update(Additive item)
        {
            throw new NotImplementedException();
        }
    }
}
