using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class AddedHydroguard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Additive",
                columns: new[] { "Id", "Brand", "Name", "Tags", "Type" },
                values: new object[] { 6, "Botanicare", "Hydroguard", null, "ROOT SUPPLEMENT" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Additive",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
