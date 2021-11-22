using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using System;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Threading.Tasks;

namespace StudentCourses.Data.SeedData
{
    public class PreConfigured
    {
        public static void SeedRoles(RoleManager<DbRole> roleManager)
        {
            try
            {
                if (!roleManager.Roles.Any())
                {
                    var roleName = "Admin";
                    var result = roleManager.CreateAsync(new DbRole
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = roleName,
                        Description = "Admin"
                    }).Result;
                    roleName = "User";
                    var result2 = roleManager.CreateAsync(new DbRole
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = roleName,
                        Description = "User"
                    }).Result;
                }
            }
            catch (Exception e)
            {

            }
        }

        public static async Task SeedUsers(UserManager<DbUser> userManager)
        {
            try
            {
                if (!userManager.Users.Any())
                {
                    DbUser user1 = new DbUser
                    {
                        Name = "Peter",
                        LastName = "Parker",
                        UserName = "Peter",
                        Email = "superadmin@gmail.com",
                        PhoneNumber = "+380976213651",
                        DateOfBirth = new DateTime(1995, 03, 25)
                    };
                    DbUser user2 = new DbUser
                    {
                        Name = "Ivan",
                        LastName = "Anderson",
                        UserName = "Ivan",
                        Email = "ivanbanan@gmail.com",
                        PhoneNumber = "+380964120472",
                        DateOfBirth = new DateTime(1999, 12, 02)
                    };
                    DbUser user3 = new DbUser
                    {
                        Name = "Olia",
                        LastName = "Fleming",
                        UserName = "Olia",
                        Email = "olia@gmail.com",
                        PhoneNumber = "+380971294621",
                        DateOfBirth = new DateTime(2000, 07, 12)
                    };
                    await userManager.CreateAsync(user1, "Qwerty-1");
                    await userManager.AddToRoleAsync(user1, "Admin");

                    await userManager.CreateAsync(user2, "Qwerty-1");
                    await userManager.AddToRoleAsync(user2, "User");

                    await userManager.CreateAsync(user3, "Qwerty-1");
                    await userManager.AddToRoleAsync(user3, "User");
                }
            }
            catch (Exception e)
            {

            }
        }

    }
}
