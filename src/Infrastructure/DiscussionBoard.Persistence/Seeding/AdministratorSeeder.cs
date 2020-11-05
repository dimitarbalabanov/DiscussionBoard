using DiscussionBoard.Application.Common.Interfaces;
using DiscussionBoard.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionBoard.Persistence.Seeding
{
    public class AdministratorSeeder : IDbContextSeeder
    {
        public async Task SeedAsync(IApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            await SeedAdminAsync(userManager, "Administrator");
        }

        private static async Task SeedAdminAsync(UserManager<User> userManager, string administratorRoleName)
        {
            var user = await userManager.FindByNameAsync("Administrator");
            if (user != null && (await userManager.IsInRoleAsync(user, "Administrator")))
            {
                return;
            }

            var admin = new User
            {
                UserName = "Administrator",
                Email = "admin@admin.admin",
            };

            var result = await userManager.CreateAsync(admin, "Administrator");
            if (!result.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
            }

            var roleResult = await userManager.AddToRoleAsync(admin, administratorRoleName);
            if (!roleResult.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
            }

            var data = @"311395fa-5cda-48ca-8ac0-085a2d2a3dc2,ctrippick0,glente0@github.io,2020-06-01 12:00:56
                        6d50fbf5-736a-4710-89d7-74b605878156,jdeer1,smethven1@usda.gov,2020-01-01 04:56:57
                        047f58c9-3f9a-4e7d-8034-1da3bc5d9d9b,wberni2,msiddaley2@dmoz.org,2019-11-10 13:38:35
                        0525ef24-bc49-4b6a-ad64-6ef5b491cf78,repiscopi3,ealaway3@google.es,2020-04-28 14:45:54
                        87300db7-dcd7-49da-b14d-5e64af7ed7e0,ecalcraft4,lstuck4@globo.com,2020-11-01 21:09:08
                        664a9032-7605-47cd-a78b-267a8f89d331,fmeo5,amansour5@de.vu,2020-06-14 00:11:10
                        eeff7378-f68d-4b6a-8e66-d606dbab6350,jhatz6,icall6@joomla.org,2020-03-05 16:07:55
                        8a74a735-4ef4-4e4b-a8e5-48d3e7601cd8,nashpital7,pchimes7@opensource.org,2020-07-22 20:19:01
                        0352ae9d-e4dd-469f-8d58-8ce794a4b637,scolombier8,chynd8@mlb.com,2020-09-01 14:22:12
                        a58d5a0b-b0e1-415b-9b66-bb689552b581,aneilan9,kmcmackin9@quantcast.com,2020-09-25 21:09:38
                        bfc18422-aa02-4bc4-9c9e-52d0cfe247f4,eyuryaeva,eshermea@artisteer.com,2020-02-20 08:10:00
                        2d31dd51-981a-4330-9446-2678daff7ce6,smagnerb,cosgorbyb@uiuc.edu,2020-10-11 04:28:15
                        d0ecec7d-8981-453a-a7d9-cd216525e3e5,dchennellsc,twibberleyc@columbia.edu,2019-11-15 04:10:12
                        95f1bf4a-4280-4878-a873-953c2f5bda9a,ndundridged,wbarajasd@wikispaces.com,2020-06-09 12:34:28
                        068151b3-a6c6-4034-84af-e54c6ae01326,mbaytrope,kradeliffee@jalbum.net,2020-06-23 09:22:37
                        42e2cfbc-1572-4192-9320-59e676113eaa,ecoddringtonf,tleynhamf@nytimes.com,2020-03-07 11:33:51
                        eabd211d-5d02-41d0-b020-34819e74e664,cphilipeauxg,cvanbrugg@usatoday.com,2020-09-10 14:10:09
                        5a904941-b474-492e-a30d-e287adf7e52b,spinnickh,pcansfieldh@stanford.edu,2020-07-15 21:15:05
                        3acc4bea-4bcf-4878-b90c-4edebe10c5c2,psargeanti,abukaci@ft.com,2020-06-28 02:50:55
                        3033d4e8-cda1-4e11-a490-2b0225520157,sdevorillj,eferencej@nhs.uk,2020-05-20 21:05:55
                        d52703fb-532f-499c-b7c2-f9830de28822,aellingfordk,jtollerk@ftc.gov,2019-12-13 12:30:42
                        6b5e3950-a13c-4f03-83c9-e0e1dc47abe4,djulyl,tbogl@walmart.com,2020-01-18 10:46:36
                        27d98116-009c-41b0-a541-2456c82c7a97,pdaylym,kpowderm@bizjournals.com,2020-03-31 13:35:57
                        0e53d1d9-5d12-4108-961f-340eb96b1b3a,sjeynesn,ldomelawn@alibaba.com,2019-11-29 18:12:33
                        0225c76f-2c45-404b-b2a8-95dbea44e4ef,demmero,flindenbergo@hibu.com,2020-05-25 18:49:37
                        79a54962-9eb3-4745-9469-6f566d99006f,acardenosap,eyoungmanp@senate.gov,2019-11-25 19:37:09
                        be58013f-ba4f-41b6-99af-2c1eb7e21a6f,jcopelloq,sizzattq@youku.com,2019-12-30 17:53:02
                        141a0f42-9521-4255-9cb2-0dcb0d2d1d3d,amynardr,isimonir@dropbox.com,2020-08-19 14:10:25
                        863e29ed-bf50-4f70-a6f9-ef7ce71e0720,ydobbinss,pbullocks@telegraph.co.uk,2020-07-31 10:21:59
                        89b05b6a-86a9-41d3-9da0-c7d396047fd2,fhiset,apideont@theguardian.com,2020-05-22 06:57:35";

            var lines = data.Split("\r\n");
            foreach (var line in lines)
            {
                var info = line.Trim().Split(",");
                var usr = new User
                {
                    Id = info[0],
                    UserName = info[1],
                    Email = info[2],
                    CreatedOn = DateTime.Parse(info[3])
                };

                await userManager.CreateAsync(usr, "password");
            }
        }
    }
}
