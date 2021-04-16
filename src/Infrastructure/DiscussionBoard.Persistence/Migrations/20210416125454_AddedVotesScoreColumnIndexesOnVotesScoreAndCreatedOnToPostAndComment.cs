using Microsoft.EntityFrameworkCore.Migrations;

namespace DiscussionBoard.Persistence.Migrations
{
    public partial class AddedVotesScoreColumnIndexesOnVotesScoreAndCreatedOnToPostAndComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VotesScore",
                table: "Posts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Forums",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Subtitle",
                table: "Forums",
                maxLength: 80,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VotesScore",
                table: "Comments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CreatedOn",
                table: "Posts",
                column: "CreatedOn");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_VotesScore",
                table: "Posts",
                column: "VotesScore");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CreatedOn",
                table: "Comments",
                column: "CreatedOn");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_VotesScore",
                table: "Comments",
                column: "VotesScore");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Posts_CreatedOn",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_VotesScore",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Comments_CreatedOn",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_VotesScore",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "VotesScore",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "VotesScore",
                table: "Comments");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Forums",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 40);

            migrationBuilder.AlterColumn<string>(
                name: "Subtitle",
                table: "Forums",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 80);
        }
    }
}
