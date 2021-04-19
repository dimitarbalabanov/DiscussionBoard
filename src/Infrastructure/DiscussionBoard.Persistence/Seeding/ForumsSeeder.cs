using DiscussionBoard.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class ForumsSeeder 
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Forums.Any())
            {
                return;
            }

            var data = new string[] {
                    "1,2020-09-05 11:02:43,Movies,000000,ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue donec pharetra magna vestibulum aenean sit amet justo morbi ut odio cras mi pede malesuada vestibulum proin",
                    "2,2020-10-18 11:50:01,Gaming,000000,vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum unt ante vel ipsum praesent blandit lacinia erat vestibulum sed",
                    "3,2020-04-12 23:31:59,Politics,000000,sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem pis sed ante vivamus tortor duis mattis egestas metus aenean",
                    "4,2020-09-10 16:03:56,Funny,000000,ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollic vel ipsum praesent blandit lacinia erat vestibulum sed magna",
                    "5,2019-12-09 23:07:37,Something,000000,natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida semm eu interdum eu tincidunt in leo maecenas pulvinar lobortis",
                    "6,2020-10-23 19:22:32,Books,000000,in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ur gravida sem praesent id massa id nisl venenatis lacinia aenean",
                    "7,2020-09-07 05:30:59,Business,000000,rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in impin felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor" };
            var forums = new List<Forum>();

            foreach (var line in data)
            {
                var info = line.Trim().Split(",");
                forums.Add(new Forum
                {
                    CreatedOn = DateTime.Parse(info[1]),
                    Title = info[2],
                    //Color = info[3],
                    Description = info[4],
                });
            }

            await dbContext.Forums.AddRangeAsync(forums);
        }
    }
}
