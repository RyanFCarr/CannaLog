namespace Server.Models
{
    public class AdditiveAdjustment
    {
        public int Id { get; set; }
        public virtual IEnumerable<AdditiveDosage>? Dosages { get; set; }
        public int FinalPPM { get; set; }
        public int InitialPPM { get; set; }
        public virtual IEnumerable<PHAdjustment> PHAdjustments { get; set; }
    }
}
