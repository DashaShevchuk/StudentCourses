using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using System;
using System.Linq;
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
        public static void SeedImages(EfDbContext context)
        {
            try
            {
                Image image1 = new Image
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "image1",
                    Path = "..."
                };
                Image image2 = new Image
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "image2",
                    Path = "..."
                };
                Image image3 = new Image
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "image3",
                    Path = "..."
                };
                context.Image.AddRangeAsync(image1, image2, image3);
                context.SaveChanges();
                
            }
            catch (Exception e)
            {

            }
        }

        public static async Task SeedUsers(UserManager<DbUser> userManager, EfDbContext context)
        {
            try
            {
                if (!userManager.Users.Any())
                {
                    DbUser user1 = new DbUser
                    {
                        UserName = "admin",
                        Name = "Peter",
                        Surname = "Parker",
                        Email = "superadmin@gmail.com",
                        PhoneNumber = "+380503334031",
                        Image = context.Image.FirstOrDefault(t=> t.Name == "image1")
                    };
                    DbUser user2 = new DbUser
                    {
                        UserName = "ivanbanan",
                        Name = "Ivan",
                        Surname = "Anderson",
                        Email = "ivanbanan@gmail.com",
                        PhoneNumber = "+380505551541",
                        Image = context.Image.FirstOrDefault(t => t.Name == "image2")
                    };
                    DbUser user3 = new DbUser
                    {
                        UserName = "oliamartunuk",
                        Name = "Olia",
                        Surname = "Fleming",
                        Email = "olia@gmail.com",
                        PhoneNumber = "+380453855561",
                        Image = context.Image.FirstOrDefault(t => t.Name == "image3")
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
