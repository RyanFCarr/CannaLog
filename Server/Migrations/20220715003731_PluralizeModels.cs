using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class PluralizeModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditiveAdjustment_GrowLogs_GrowLogId",
                table: "AdditiveAdjustment");

            migrationBuilder.DropForeignKey(
                name: "FK_AdditiveDosage_Additive_AdditiveId",
                table: "AdditiveDosage");

            migrationBuilder.DropForeignKey(
                name: "FK_AdditiveDosage_AdditiveAdjustment_AdditiveAdjustmentId",
                table: "AdditiveDosage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdditiveDosage",
                table: "AdditiveDosage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdditiveAdjustment",
                table: "AdditiveAdjustment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Additive",
                table: "Additive");

            migrationBuilder.RenameTable(
                name: "AdditiveDosage",
                newName: "AdditiveDosages");

            migrationBuilder.RenameTable(
                name: "AdditiveAdjustment",
                newName: "AdditiveAdjustments");

            migrationBuilder.RenameTable(
                name: "Additive",
                newName: "Additives");

            migrationBuilder.RenameIndex(
                name: "IX_AdditiveDosage_AdditiveId",
                table: "AdditiveDosages",
                newName: "IX_AdditiveDosages_AdditiveId");

            migrationBuilder.RenameIndex(
                name: "IX_AdditiveDosage_AdditiveAdjustmentId",
                table: "AdditiveDosages",
                newName: "IX_AdditiveDosages_AdditiveAdjustmentId");

            migrationBuilder.RenameIndex(
                name: "IX_AdditiveAdjustment_GrowLogId",
                table: "AdditiveAdjustments",
                newName: "IX_AdditiveAdjustments_GrowLogId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdditiveDosages",
                table: "AdditiveDosages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdditiveAdjustments",
                table: "AdditiveAdjustments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Additives",
                table: "Additives",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditiveAdjustments_GrowLogs_GrowLogId",
                table: "AdditiveAdjustments",
                column: "GrowLogId",
                principalTable: "GrowLogs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditiveDosages_AdditiveAdjustments_AdditiveAdjustmentId",
                table: "AdditiveDosages",
                column: "AdditiveAdjustmentId",
                principalTable: "AdditiveAdjustments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditiveDosages_Additives_AdditiveId",
                table: "AdditiveDosages",
                column: "AdditiveId",
                principalTable: "Additives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditiveAdjustments_GrowLogs_GrowLogId",
                table: "AdditiveAdjustments");

            migrationBuilder.DropForeignKey(
                name: "FK_AdditiveDosages_AdditiveAdjustments_AdditiveAdjustmentId",
                table: "AdditiveDosages");

            migrationBuilder.DropForeignKey(
                name: "FK_AdditiveDosages_Additives_AdditiveId",
                table: "AdditiveDosages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Additives",
                table: "Additives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdditiveDosages",
                table: "AdditiveDosages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdditiveAdjustments",
                table: "AdditiveAdjustments");

            migrationBuilder.RenameTable(
                name: "Additives",
                newName: "Additive");

            migrationBuilder.RenameTable(
                name: "AdditiveDosages",
                newName: "AdditiveDosage");

            migrationBuilder.RenameTable(
                name: "AdditiveAdjustments",
                newName: "AdditiveAdjustment");

            migrationBuilder.RenameIndex(
                name: "IX_AdditiveDosages_AdditiveId",
                table: "AdditiveDosage",
                newName: "IX_AdditiveDosage_AdditiveId");

            migrationBuilder.RenameIndex(
                name: "IX_AdditiveDosages_AdditiveAdjustmentId",
                table: "AdditiveDosage",
                newName: "IX_AdditiveDosage_AdditiveAdjustmentId");

            migrationBuilder.RenameIndex(
                name: "IX_AdditiveAdjustments_GrowLogId",
                table: "AdditiveAdjustment",
                newName: "IX_AdditiveAdjustment_GrowLogId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Additive",
                table: "Additive",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdditiveDosage",
                table: "AdditiveDosage",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdditiveAdjustment",
                table: "AdditiveAdjustment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditiveAdjustment_GrowLogs_GrowLogId",
                table: "AdditiveAdjustment",
                column: "GrowLogId",
                principalTable: "GrowLogs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditiveDosage_Additive_AdditiveId",
                table: "AdditiveDosage",
                column: "AdditiveId",
                principalTable: "Additive",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AdditiveDosage_AdditiveAdjustment_AdditiveAdjustmentId",
                table: "AdditiveDosage",
                column: "AdditiveAdjustmentId",
                principalTable: "AdditiveAdjustment",
                principalColumn: "Id");
        }
    }
}
