using DiscussionBoard.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class UsersSeeder : IDbContextSeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            await SeedUsersAsync(userManager);
        }

        private static async Task SeedUsersAsync(UserManager<User> userManager)
        {
            var data = @"96dcc705-9f6d-405e-a7ff-a93a3be51387,;Orelee;obruck0@amazon.com;2020-01-17 20:43:17;sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean
                         505230b8-46c2-4467-ac15-8ba282fd6adb,;Dilan;dmckeurton1@wisc.edu;2020-06-16 01:51:23;pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing
                         9ed2db4a-c781-490e-add4-396339fe01b1,;Cecilius;cchamberlayne2@gizmodo.com;2020-09-01 23:48:05;ultrices posuere cubilia curae nulla dapibus dolor vel
                         68c948a0-0779-4d57-9caa-277fc8a9abdb,;Cynthia;ccurrao3@sitemeter.com;2020-08-19 03:41:27;mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate
                         18c150ef-9ece-4f05-9d62-6b82831d4922,;Colene;cfeben4@bloglines.com;2020-05-16 22:38:32;magna at nunc commodo placerat praesent
                         29fa2195-5828-43f0-b493-4d22d59b3725,;Annamarie;abrussell5@php.net;2020-08-26 03:14:45;nulla ut erat id mauris vulputate elementum nullam
                         a5ab7212-20e2-4883-957c-3343e7f18e86,;Fleming;fjenkyn6@prnewswire.com;2020-05-24 08:27:25;morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis
                         fc75dfc2-8874-4755-ae19-d47c0a208d62,;Daile;dgrunbaum7@mapy.cz;2020-01-16 17:42:23;dapibus augue vel accumsan tellus nisi eu orci mauris
                         3d6a5667-0fef-4375-a381-3e50c8c4ad33,;Matteo;mkirke8@jalbum.net;2020-08-07 01:49:23;in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar
                         dc1cb7a5-3337-4932-b946-686385d06d95,;Clemente;cleggate9@mashable.com;2020-07-27 00:32:21;dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis
                         bfdf1ee8-b9cf-458e-84c2-36f29a679a08,;Raff;rcornera@addtoany.com;2020-06-18 00:06:16;nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit
                         13113c97-64fe-496b-ad16-28b964c70952,;Sasha;sjerzykiewiczb@a8.net;2020-01-12 14:06:16;enim blandit mi in porttitor pede justo eu
                         e32b713f-33c1-4f71-8849-28258f9aec5b,;Cherilynn;clarringtonc@youtube.com;2020-08-04 09:10:07;velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id
                         d4c6010d-1e38-4bd3-8f18-61381cbe3e47,;Perl;pwakleyd@macromedia.com;2020-11-03 06:47:13;vel nulla eget eros elementum pellentesque
                         0259279e-b9a4-47b8-b99c-7cd8e2e03617,;Iormina;iseilere@archive.org;2020-10-05 02:19:34;nonummy integer non velit donec diam neque vestibulum eget
                         d89331f5-2cbe-4870-807e-24724b791049,;Pernell;pkilminsterf@altervista.org;2020-07-28 01:57:56;a suscipit nulla elit ac nulla
                         809c5cd7-8c4b-4816-8394-9490f1e1734c,;Loleta;lmcnelisg@fema.gov;2020-05-25 01:13:42;
                         a5ccee16-4c82-4257-831e-b3a3e3f4bfd6,;Linnet;lboudah@netlog.com;2019-11-25 17:47:53;nulla nisl nunc nisl duis bibendum felis sed
                         aa2a1470-d8c5-4496-b846-199ee2d23de2,;Amby;aumfreyi@barnesandnoble.com;2020-01-06 12:46:50;lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris
                         af346954-0e70-4563-bd08-038fcfb4a814;Dreddy;dlayingj@quantcast.com;2020-06-08 22:45:04;rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat";
            //"96dcc705-9f6d-405e-a7ff-a93a3be51387, 505230b8-46c2-4467-ac15-8ba282fd6adb, 9ed2db4a-c781-490e-add4-396339fe01b1, 68c948a0-0779-4d57-9caa-277fc8a9abdb, 18c150ef-9ece-4f05-9d62-6b82831d4922, 29fa2195-5828-43f0-b493-4d22d59b3725, a5ab7212-20e2-4883-957c-3343e7f18e86, fc75dfc2-8874-4755-ae19-d47c0a208d62, 3d6a5667-0fef-4375-a381-3e50c8c4ad33, dc1cb7a5-3337-4932-b946-686385d06d95, bfdf1ee8-b9cf-458e-84c2-36f29a679a08, 13113c97-64fe-496b-ad16-28b964c70952, e32b713f-33c1-4f71-8849-28258f9aec5b, d4c6010d-1e38-4bd3-8f18-61381cbe3e47, 0259279e-b9a4-47b8-b99c-7cd8e2e03617, d89331f5-2cbe-4870-807e-24724b791049, 809c5cd7-8c4b-4816-8394-9490f1e1734c, a5ccee16-4c82-4257-831e-b3a3e3f4bfd6, aa2a1470-d8c5-4496-b846-199ee2d23de2, af346954-0e70-4563-bd08-038fcfb4a814"
            var lines = data.Split("\r\n");
            foreach (var line in lines)
            {
                var info = line.Trim().Split(";");
                var user = new User
                {
                    Id = info[0],
                    UserName = info[1],
                    Email = info[2],
                    CreatedOn = DateTime.Parse(info[3]),
                    Bio = info[4] ?? null
                };

                await userManager.CreateAsync(user, "password");
            }
        }
    }
}
