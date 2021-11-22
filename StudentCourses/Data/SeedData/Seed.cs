using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities.AppUeser;
using System;
using System.Threading.Tasks;

namespace StudentCourses.Data.SeedData
{
    public class Seed
    {
        public static async Task SeedData(IServiceProvider services, IHostEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EfDbContext>();
                PreConfigured.SeedRoles(managerRole);
                await PreConfigured.SeedUsers(manager);
            }
        }
    }
}
