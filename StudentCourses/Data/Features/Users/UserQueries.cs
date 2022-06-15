using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Interfaces.UserInterfaces;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Features.Users
{
    public class UserQueries : IUserQueries
    {
        private readonly UserManager<DbUser> userManager;
        private readonly EfDbContext context;
        private readonly IConfiguration configuration;
        private readonly ICourseQueries courseQueries;

        public UserQueries(UserManager<DbUser> UserManager, EfDbContext Context, IConfiguration Configuration, ICourseQueries CourseQueries)
        {
            userManager = UserManager;
            context = Context;
            configuration = Configuration;
            courseQueries = CourseQueries;
        }

        public async Task<DbUser> FindUserById(string id)
        {
            return await userManager.FindByIdAsync(id);
        }

        public async Task<IEnumerable<UserLoginInfo>> GetUserLogins(DbUser user)
        {
            return await userManager.GetLoginsAsync(user);
        }

        public async Task<IEnumerable<string>> GetUserRoles(DbUser user)
        {
            return await userManager.GetRolesAsync(user);
        }

        public async Task<IEnumerable<UsersModel>> GetUsers()
        {
            string path = $"{configuration.GetValue<string>("CoursesUrlImages")}/";
            IEnumerable<DbUser> allUsers = await userManager.GetUsersInRoleAsync("User");
            List<UsersModel> resultUsers = new List<UsersModel>();
            foreach(var item in allUsers)
            {
                UsersModel user = new UsersModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    LastName = item.LastName,
                    Email = item.Email,
                    TextDateOfBirth = item.DateOfBirth.ToString("dd.MM.yyyy"),
                    DateOfBirth = item.DateOfBirth,
                    PhoneNumber = item.PhoneNumber,
                };

                IEnumerable<GetCoursesModel> userCourses = courseQueries.GetUserCourses(item.Id);
                user.UserCourses = userCourses;

                resultUsers.Add(user);
            }

            return resultUsers;
        }

        public IEnumerable<UserCourses> GetUserCoursesByUserId(string userId)
        {
            return context.UserCourse.Where(x => x.UserId == userId);
        }

        public UserCourses GetUserCourse(string userId, int courseId)
        {
            return context.UserCourse.FirstOrDefault(x => x.UserId == userId && x.CourseId == courseId);
        }

        public IEnumerable<HangfireJobs> GetHangfireJobs(string userId, int courseId)
        {
            var userCourses = GetUserCourse(userId, courseId);
            var hangfireJobs = context.HangfireJobs.Where(x=>x.UserCoursesId == userCourses.Id);

            return hangfireJobs;
        }

        public IEnumerable<HangfireJobs> GetHangfireJobsBuCourseId(IEnumerable<UserCourses> userCourses, int courseId)
        {
            var userCoursesByCourseId = courseQueries.GetUserCoursesByCourseId(courseId);
            List<HangfireJobs> jobs = new List<HangfireJobs>();

            foreach (var item in userCoursesByCourseId)
            {
                jobs.AddRange(context.HangfireJobs.Where(x => x.UserCoursesId == item.Id));
            }

            return jobs;
        }

        public IEnumerable<HangfireJobs> GetHangfireJobsBuUserId(IEnumerable<UserCourses> userCourses, string userId)
        {
            var userCoursesByCourseId = GetUserCoursesByUserId(userId);
            List<HangfireJobs> jobs = new List<HangfireJobs>();

            foreach (var item in userCoursesByCourseId)
            {
                jobs.AddRange(context.HangfireJobs.Where(x => x.UserCoursesId == item.Id));
            }

            return jobs;
        }
    }
}
