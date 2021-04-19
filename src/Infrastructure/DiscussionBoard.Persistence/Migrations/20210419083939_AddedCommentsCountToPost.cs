using Microsoft.EntityFrameworkCore.Migrations;

namespace DiscussionBoard.Persistence.Migrations
{
    public partial class AddedCommentsCountToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CommentsCount",
                table: "Posts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentsCount",
                table: "Posts");
        }
    }
}
