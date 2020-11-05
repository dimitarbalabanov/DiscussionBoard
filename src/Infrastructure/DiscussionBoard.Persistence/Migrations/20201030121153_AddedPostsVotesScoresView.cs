using Microsoft.EntityFrameworkCore.Migrations;

namespace DiscussionBoard.Persistence.Migrations
{
    public partial class AddedPostsVotesScoresView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "View_PostsVotesScores",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VotesScore = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_View_PostsVotesScores", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "View_PostsVotesScores");
        }
    }
}
