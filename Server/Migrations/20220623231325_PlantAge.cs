using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class PlantAge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Plants",
                type: "int",
                nullable: true,
                computedColumnSql: "CASE WHEN TransplantDate IS NULL THEN 0 ELSE DATEDIFF(DAY, TransplantDate, CASE WHEN HarvestDate IS NULL THEN GETDATE() ELSE HarvestDate END) END");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Plants");
        }
    }
}
