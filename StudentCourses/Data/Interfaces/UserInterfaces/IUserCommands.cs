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
    public interface IUserCommands
    {
        Task<IdentityResult> CreateUser(DbUser user, string password);

        Task<IdentityResult> SetUserRole(DbUser user, string roleName);

        Task<IdentityResult> RemoveUserLoggins(DbUser user, UserLoginInfo login);

        Task<IdentityResult> RemoveUserRole(DbUser user, string role);

        Task<IdentityResult> DeleteUser(DbUser user);

        Task<IdentityResult> EditUser(DbUser user, EditUserModel model);

        void RemoveUserCourses(string userId);

        void UnsubscribeCourse(string userId, int courseId);

        void SubscribeCourse(UserCourses userCourse);

        void CreateJob(HangfireJobs hangfireJob);
    }
}
