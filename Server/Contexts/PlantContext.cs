using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Contexts
{
    public class PlantContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public PlantContext(DbContextOptions<PlantContext> options) : base(options) { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.


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
