namespace Server.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Strain { get; set; }
        public string? Breeder { get; set; }
        public string BaseNutrientsBrand { get; set; }
        public bool IsFeminized { get; set; }
        public decimal TargetPH { get; set; }
        public DateTime? TransplantDate { get; set; }
        public DateTime? HarvestDate { get; set; }
    }
}
