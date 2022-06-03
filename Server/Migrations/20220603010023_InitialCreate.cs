using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Strain = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Breeder = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BaseNutrientsBrand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FeminizedSeed = table.Column<bool>(type: "bit", nullable: false),
                    TargetPH = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransplantDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HarvestDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Plants");
        }
    }
}
