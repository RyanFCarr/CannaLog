#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
using System.Runtime.Serialization;

namespace Server.Models
{
    public class AdditiveAdjustment
    {
        public int Id { get; set; }
        public virtual IEnumerable<AdditiveDosage>? Dosages { get; set; }
        public int FinalPPM { get; set; }
        public int InitialPPM { get; set; }
        [DataMember(Name = "phAdjustments")]
        public virtual IEnumerable<PHAdjustment> PHAdjustments { get; set; }
    }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
