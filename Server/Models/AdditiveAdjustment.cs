#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace Server.Models
{
    public class AdditiveAdjustment
    {
        public int Id { get; set; }
        public virtual IEnumerable<AdditiveDosage>? Dosages { get; set; }
        public int FinalPPM { get; set; }
        public int InitialPPM { get; set; }
        public string Type { get; set; }
    }

    public class AdditiveAdjustmentDto
    {
        public int Id { get; set; }
        public IEnumerable<AdditiveDosageDto>? Dosages { get; set; }
        public int FinalPPM { get; set; }
        public int InitialPPM { get; set; }
        public string Type { get; set; }
    }

    public class AdditiveAdjustmentSaveDto
    {
        public IEnumerable<AdditiveDosageSaveDto>? Dosages { get; set; }
        public int FinalPPM { get; set; }
        public int InitialPPM { get; set; }
        public string Type { get; set; }
    }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.