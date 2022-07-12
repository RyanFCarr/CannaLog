using Server.Contexts;
using Server.Models;

namespace Server.Repositories
{
    public interface IPlantRepository : IRepository<Plant> { }
    public class PlantRepository : IPlantRepository
    {
        private readonly CannaLogContext _context;

        public PlantRepository(CannaLogContext context)
        {
            _context = context;
        }

        public Plant Create(Plant plant)
        {
            var entity = _context.Add(plant);
            _context.SaveChanges();

            return entity.Entity;
        }

        public void Delete(int id)
        {
            var plant = GetOne(id);

            if (plant == null) throw new ArgumentException("Plant not found");

            _context.Remove(plant);
            _context.SaveChanges();
        }

        public IEnumerable<Plant> GetAll() => _context.Plants;

        public Plant? GetOne(int id) => _context.Plants.Find(id);

        public Plant Update(Plant plant)
        {
            _context.Update(plant);
            _context.SaveChanges();

#pragma warning disable CS8603 // Possible null reference return.
            return GetOne(plant.Id);
#pragma warning restore CS8603 // Possible null reference return.
        }
    }
}
