using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class AddStatusAndTerminationReason : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTerminated",
                table: "Plants");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Plants",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TerminationReason",
                table: "Plants",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "TerminationReason",
                table: "Plants");

            migrationBuilder.AddColumn<bool>(
                name: "IsTerminated",
                table: "Plants",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
