#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace Server.Models
{
    public class AdditiveDosage
    {
        public int Id { get; set; }
        public int AdditiveId { get; set; }
        public virtual Additive Additive { get; set; }
        public decimal Amount { get; set; }
        public string UnitofMeasure { get; set; }
    }

    public class AdditiveDosageDto
    {
        public int Id { get; set; }
        public virtual AdditiveDto Additive { get; set; }
        public decimal Amount { get; set; }
        public string UnitofMeasure { get; set; }
    }

    public class AdditiveDosageSaveDto
    {
        public int AdditiveId { get; set; }
        public decimal Amount { get; set; }
        public string UnitofMeasure { get; set; }
    }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
