using Bogus;
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

        public static async Task SeedUsers(UserManager<DbUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                DbUser admin = new DbUser
                {
                    Name = "Peter",
                    LastName = "Parker",
                    UserName = "Peter",
                    Email = "superadmin@gmail.com",
                    PhoneNumber = "+380976213651",
                    DateOfBirth = new DateTime(1995, 03, 25),
                    EmailConfirmed = true
                };
                //DbUser user2 = new DbUser
                //{
                //    Name = "Ivan",
                //    LastName = "Anderson",
                //    UserName = "Ivan",
                //    Email = "ivanbanan@gmail.com",
                //    PhoneNumber = "+380964120472",
                //    DateOfBirth = new DateTime(1999, 12, 02),
                //    EmailConfirmed = true
                //};
                //DbUser user3 = new DbUser
                //{
                //    Name = "Olia",
                //    LastName = "Fleming",
                //    UserName = "Olia",
                //    Email = "olia@gmail.com",
                //    PhoneNumber = "+380971294621",
                //    DateOfBirth = new DateTime(2000, 07, 12),
                //    EmailConfirmed = true
                //};
                await userManager.CreateAsync(admin, "Qwerty-1");
                await userManager.AddToRoleAsync(admin, "Admin");

                //await userManager.CreateAsync(user2, "Qwerty-1");
                //await userManager.AddToRoleAsync(user2, "User");

                //await userManager.CreateAsync(user3, "Qwerty-1");
                //await userManager.AddToRoleAsync(user3, "User");


                Faker<DbUser> usersFaked = new Faker<DbUser>("en")
                                    .RuleFor(t => t.DateOfBirth, f => f.Date.BetweenOffset(
                                        new DateTimeOffset(DateTime.Now.AddYears(-10)),
                                        new DateTimeOffset(DateTime.Now.AddYears(-5))).DateTime)
                                    .RuleFor(t => t.UserName, f => f.Person.UserName)
                                    .RuleFor(t => t.Name, f => f.Person.FirstName)
                                    .RuleFor(t => t.LastName, f => f.Person.LastName)
                                    .RuleFor(t => t.Email, f => f.Person.Email)
                                    .RuleFor(t => t.PhoneNumber, f => f.Person.Phone);

                var randoms = usersFaked.Generate(30);
                foreach (var item in randoms)
                {
                    DbUser user = new DbUser
                    {
                        Name = item.Name,
                        LastName = item.LastName,
                        UserName = item.UserName,
                        DateOfBirth = item.DateOfBirth,
                        Email = item.Email,
                        PhoneNumber = item.PhoneNumber,
                        EmailConfirmed = true
                    };
                    var result = await userManager.CreateAsync(user, "Qwerty-1");
                    var result2 = await userManager.AddToRoleAsync(user, "User");
                }
            }
        }
    }
}
