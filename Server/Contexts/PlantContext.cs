using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Contexts
{
    public class PlantContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }

        public PlantContext(DbContextOptions<PlantContext> options) : base(options) { }
    }
}
