using Server.Contexts;
using Server.Models;
using System.Linq.Expressions;

namespace Server.Repositories
{
    public interface IGrowLogRepository : IRepository<GrowLog> { }
    public class GrowLogRepository : IGrowLogRepository
    {
        private readonly CannaLogContext _context;

        public GrowLogRepository(CannaLogContext context)
        {
            _context = context;
        }

        public GrowLog Create(GrowLog growLog)
        {
            var entity = _context.Add(growLog);
            _context.SaveChanges();

            return entity.Entity;
        }

        public void Delete(int id)
        {
            var growLog = GetOne(id);

            if (growLog == null) throw new ArgumentException("GrowLog not found");

            _context.Remove(growLog);
            _context.SaveChanges();
        }

        public IEnumerable<GrowLog> GetAll() => _context.GrowLogs;
        public IEnumerable<GrowLog> GetAll(Expression<Func<GrowLog,bool>> filter) => _context.GrowLogs.Where(filter);

        public GrowLog? GetOne(int id) => _context.GrowLogs.Find(id);

        public GrowLog Update(GrowLog growLog)
        {
            _context.Update(growLog);
            _context.SaveChanges();

#pragma warning disable CS8603 // Possible null reference return.
            return GetOne(growLog.Id);
#pragma warning restore CS8603 // Possible null reference return.
        }
    }
}
