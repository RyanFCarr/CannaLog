namespace Server.Models
{
    public class AdditiveDosage
    {
        public int Id { get; set; }
        public virtual Additive Additive { get; set; }
        public decimal Amount { get; set; }
        public string UnitofMeasure { get; set; }
    }
}
