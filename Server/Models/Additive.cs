#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
namespace Server.Models
{
    public class Additive
    {
        public int Id { get; set; }
        public string? Brand { get; set; }
        public string Name { get; set; }
        public string? Tags { get; set; }
        public string Type { get; set; }
    }

    public class AdditiveDto
    {
        public int Id { get; set; }
        public string? Brand { get; set; }
        public string Name { get; set; }
        public string? Tags { get; set; }
        public string Type { get; set; }
    }

    public class AdditiveSaveDto
    {
        public string? Brand { get; set; }
        public string Name { get; set; }
        public string? Tags { get; set; }
        public string Type { get; set; }
    }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
