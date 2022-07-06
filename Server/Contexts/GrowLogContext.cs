using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Contexts
{
    public class GrowLogContext : DbContext
    {
        public DbSet<GrowLog> GrowLogs { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public GrowLogContext(DbContextOptions<GrowLogContext> options) : base(options) { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
            modelBuilder.Entity<AdditiveDosage>()
                .Property(p => p.Amount)
                .HasPrecision(8, 3);
            modelBuilder.Entity<PHAdjustment>()
                .Property(p => p.FinalPH)
                .HasPrecision(3, 1);
            modelBuilder.Entity<PHAdjustment>()
                .Property(p => p.InitialPH)
                .HasPrecision(3, 1);
            #endregion
        }
    }
}
