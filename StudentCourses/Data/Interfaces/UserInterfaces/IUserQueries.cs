using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Interfaces.UserInterfaces
{
    public interface IUserQueries
    {
        Task<IEnumerable<UsersModel>> GetUsers();

        Task<DbUser> FindUserById(string id);

        Task<IEnumerable<UserLoginInfo>> GetUserLogins(DbUser user);

        Task<IEnumerable<string>> GetUserRoles(DbUser user);

        IEnumerable<UserCourses> GetUserCoursesByUserId(string userId);

        UserCourses GetUserCourse(string userId, int courseId);

        IEnumerable<HangfireJobs> GetHangfireJobs(string userId, int courseId);

        IEnumerable<HangfireJobs> GetHangfireJobsBuCourseId(IEnumerable<UserCourses> userCourses, int courseId);

        IEnumerable<HangfireJobs> GetHangfireJobsBuUserId(IEnumerable<UserCourses> userCourses, string userId);
    }
}
 