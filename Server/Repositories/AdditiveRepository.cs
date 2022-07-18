using Server.Contexts;
using Server.Models;
using System.Linq.Expressions;

namespace Server.Repositories
{
    public interface IAdditiveRepository : IRepository<Additive> { }
    public class AdditiveRepository : IAdditiveRepository
    {
        private readonly CannaLogContext _context;

        public AdditiveRepository(CannaLogContext context)
        {
            _context = context;
        }
        public Additive Create(Additive item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Additive> GetAll() => _context.Additives;
        public IEnumerable<Additive> GetAll(Expression<Func<Additive, bool>> filter) => _context.Additives.Where(filter);

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
