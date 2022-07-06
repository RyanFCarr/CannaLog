#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace Server.Models
{
    public class PHAdjustment
    {
        public int Id { get; set; }
        public virtual IEnumerable<AdditiveDosage>? Dosages { get; set; }
        public decimal FinalPH { get; set; }
        public decimal InitialPH { get; set; }
    }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
