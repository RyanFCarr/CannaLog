#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
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
    public string GrowType { get; set; }
    public string LightingType { get; set; }
    public string LightingSchedule { get; set; }
    public string GrowMedium { get; set; }
    public string Status { get; set; }
    public string? TerminationReason { get; set; }
    public int? Age { get; set; }
    public IEnumerable<GrowLog> GrowLogs { get; set; }
  }

  public class PlantDto
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
    public string GrowType { get; set; }
    public string LightingType { get; set; }
    public string LightingSchedule { get; set; }
    public string GrowMedium { get; set; }
    public string Status { get; set; }
    public string? TerminationReason { get; set; }
    public int? Age { get; set; }
  }

    public class PlantSaveDto
    {
        public string Name { get; set; }
        public string? Strain { get; set; }
        public string? Breeder { get; set; }
        public string BaseNutrientsBrand { get; set; }
        public bool IsFeminized { get; set; }
        public decimal TargetPH { get; set; }
        public DateTime? TransplantDate { get; set; }
        public DateTime? HarvestDate { get; set; }
        public string GrowType { get; set; }
        public string LightingType { get; set; }
        public string LightingSchedule { get; set; }
        public string GrowMedium { get; set; }
        public string Status { get; set; }
        public string? TerminationReason { get; set; }
    }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
