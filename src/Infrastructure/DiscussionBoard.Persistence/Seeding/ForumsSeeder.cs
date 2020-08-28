using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class ForumsSeeder : IDbContextSeeder
    {
        public async Task SeedAsync(IApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Forums.Any())
            {
                return;
            }

            var forums = new Forum[]
            {
                new Forum
                { 
                    Title = "Movies",
                    Description = "Anything movie related",
                    Posts = new Post[]
                    {
                        new Post
                        {
                            Title = "First Post",
                            Content = "First Post Content",
                            CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c",
                            Comments = new Comment[]
                            {
                                new Comment
                                {
                                    Content = "1 comment",
                                    CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c"
                                },
                                new Comment
                                {
                                    Content = "2 comment",
                                    CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c"
                                },
                                new Comment
                                {
                                    Content = "3 comment",
                                    CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c"
                                }
                            }
                        },
                        new Post
                        {
                            Title = "Second Post",
                            Content = "Second Post Content",
                            CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c",
                            Comments = new Comment[]
                            {
                                new Comment
                                {
                                    Content = "1 comment",
                                    CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c"
                                },
                                new Comment
                                {
                                    Content = "2 comment",
                                    CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c"
                                },
                                new Comment
                                {
                                    Content = "3 comment",
                                    CreatorId = "836f68a7-1770-457f-b2ad-08803475ff0c"
                                }
                            }
                        },
                    }
                },
                new Forum
                {
                    Title = "Music",
                    Description = "Anything music related"
                },
                new Forum
                {
                    Title = "Programming",
                    Description = "Anything programming related"
                },
                new Forum
                {
                    Title = "Gaming",
                    Description = "Anything gaming related"
                },
                new Forum
                {
                    Title = "General",
                    Description = "For everything else"
                }
            };

            await dbContext.Forums.AddRangeAsync(forums);
        }
    }
}
