using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Contexts
{
    public class PlantContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }

        public PlantContext(DbContextOptions<PlantContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plant>()
                .Property(p => p.Age)
                .HasComputedColumnSql("CASE WHEN TransplantDate IS NULL THEN NULL ELSE DATEDIFF(DAY, TransplantDate, COALESCE(HarvestDate, GETDATE())) END");
            modelBuilder.Entity<Plant>()
                .Property(p => p.TargetPH)
                .HasPrecision(3, 1);
        }
    }
}
