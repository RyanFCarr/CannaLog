using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Contexts
{
    public class CannaLogContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }
        public DbSet<GrowLog> GrowLogs { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public CannaLogContext(DbContextOptions<CannaLogContext> options) : base(options) { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Plant
            modelBuilder.Entity<Plant>()
                .Property(p => p.Age)
                .HasComputedColumnSql("CASE WHEN TransplantDate IS NULL THEN NULL ELSE DATEDIFF(DAY, TransplantDate, COALESCE(HarvestDate, GETDATE())) END");
            modelBuilder.Entity<Plant>()
                .Property(p => p.TargetPH)
                .HasPrecision(3, 1);
            #endregion
            #region GrowLog
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.AirTemperature)
                .HasPrecision(4, 1);
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.FinalPH)
                .HasPrecision(3, 1);
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.GrowMediumTemperature)
                .HasPrecision(4, 1);
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.Humidity)
                .HasPrecision(3, 1);
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.InitialPH)
                .HasPrecision(3, 1);
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.LightHeight)
                .HasPrecision(4, 1);
            modelBuilder.Entity<GrowLog>()
                .Property(p => p.PlantHeight)
                .HasPrecision(4, 1);
            #endregion
            #region Additives
            // https://docs.microsoft.com/en-us/ef/core/modeling/data-seeding
            modelBuilder.Entity<Additive>()
                .HasData(new Additive[] {
                    new Additive{ Id = 1, Brand = "General Hydroponics", Name = "Micro", Type = "NUTES" },
                    new Additive{ Id = 2, Brand = "General Hydroponics", Name = "Bloom", Type = "NUTES" },
                    new Additive{ Id = 3, Brand = "General Hydroponics", Name = "CaliMag", Type = "NUTES" },
                    new Additive{ Id = 4, Brand = "General Hydroponics", Name = "PH Up", Type = "PH" },
                    new Additive{ Id = 5, Brand = "General Hydroponics", Name = "PH Down", Type = "PH" }
                });
            modelBuilder.Entity<AdditiveDosage>()
                .Property(p => p.Amount)
                .HasPrecision(8, 3);
            #endregion
        }
    }
}
