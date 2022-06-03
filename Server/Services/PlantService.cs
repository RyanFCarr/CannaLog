using Server.Models;
using Server.Repositories;

namespace Server.Services
{
    public interface IPlantService : IService<Plant> { }
    public class PlantService : IPlantService
    {
        private readonly IPlantRepository _repo;

        public PlantService(IPlantRepository repo)
        {
            _repo = repo;
        }

        public Plant Create(Plant item) => _repo.Create(item);

        public void Delete(int id) => _repo.Delete(id);

        public IEnumerable<Plant> GetAll() => _repo.GetAll();

        public Plant? GetOne(int id) => _repo.GetOne(id);

        public Plant Update(Plant item) => _repo.Update(item);
    }
}
