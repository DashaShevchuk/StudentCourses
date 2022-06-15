using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces.UserInterfaces;
using StudentCourses.Data.Models;
using System.Threading.Tasks;
using StudentCourses.Data.Entities;
using StudentCourses.Data.EfContext;
using System.Linq;

namespace StudentCourses.Data.Features.Users
{
    public class UserCommands: IUserCommands
    {
        private readonly UserManager<DbUser> userManager;
        private readonly EfDbContext context;
        private readonly IUserQueries userQueries;
        public UserCommands(UserManager<DbUser> UserManager, EfDbContext Context, IUserQueries UserQueries)
        {
            userManager = UserManager;
            context = Context;
            userQueries = UserQueries;
        }

        public async Task<IdentityResult> CreateUser(DbUser user, string password)
        {
            return await userManager.CreateAsync(user, password);
        }

        public async Task<IdentityResult> SetUserRole(DbUser user, string roleName)
        {
            return await userManager.AddToRoleAsync(user, roleName);
        }

        public async Task<IdentityResult> DeleteUser(DbUser user)
        {
            return await userManager.DeleteAsync(user); ;
        }

        public async Task<IdentityResult> RemoveUserLoggins(DbUser user, UserLoginInfo login)
        {
            return await userManager.RemoveLoginAsync(user, login.LoginProvider, login.ProviderKey);
        }

        public async Task<IdentityResult> RemoveUserRole(DbUser user, string role)
        {
            return await userManager.RemoveFromRoleAsync(user, role);
        }

        public async Task<IdentityResult> EditUser(DbUser user, EditUserModel model)
        {
            if (user.Name != model.Name)
            {
                user.Name = model.Name;
            }

            if (user.LastName != model.LastName)
            {
                user.LastName = model.LastName;
            }

            if (user.Email != model.Email)
            {
                user.Email = model.Email;
            }

            if (user.PhoneNumber != model.PhoneNumber)
            {
                user.PhoneNumber = model.PhoneNumber;
            }

            if (user.DateOfBirth != model.DateOfBirth)
            {
                user.DateOfBirth = model.DateOfBirth;
            }

            var updateUserResult = await userManager.UpdateAsync(user);
            return updateUserResult;
        }

        public void RemoveUserCourses(string userId)
        {
            var userCourses = userQueries.GetUserCoursesByUserId(userId);
            if (userCourses != null)
            {
                var userJobs = userQueries.GetHangfireJobsBuUserId(userCourses, userId);
                if (userJobs != null)
                {
                    context.HangfireJobs.RemoveRange(userJobs);
                }
                context.UserCourse.RemoveRange(userCourses);
                context.SaveChanges();
            }
        }

        public void UnsubscribeCourse(string userId, int courseId)
        {
            var userCourse = userQueries.GetUserCourse(userId, courseId);
            if (userCourse != null)
            {
                var hangfireJobs = userQueries.GetHangfireJobs(userId, courseId);//багато використовую цей метод, нада винести
                if (hangfireJobs != null)
                {
                    context.HangfireJobs.RemoveRange(hangfireJobs);
                }
                context.UserCourse.Remove(userCourse);
                context.SaveChanges();
            }
        }

        public async void SubscribeCourse(UserCourses userCourse)
        {
            await context.UserCourse.AddAsync(userCourse);
            context.SaveChanges();
        }

        public async void CreateJob(HangfireJobs hangfireJob)
        {
            await context.HangfireJobs.AddAsync(hangfireJob);
            context.SaveChanges();
        }
    }
}
