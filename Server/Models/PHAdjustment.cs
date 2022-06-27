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
