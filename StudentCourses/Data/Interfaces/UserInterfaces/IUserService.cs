using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace StudentCourses.Data.Interfaces.UserInterfaces
{
    public interface IUserService
    {
        Task<HttpStatusCode> RegistrUser(RegistrationModel model);

        Task<HttpStatusCode> ConfirmationEmail(string token);

        Task<HttpStatusCode> DeleteUser(string id);

        Task<HttpStatusCode> EditUser(EditUserModel model);

        Task<GetUsersModel> GetUsers(UsersPageModel model);

        IEnumerable<UsersModel> SortUsers(IEnumerable<UsersModel> users, string columnKey, string sortOrder);

        Task<HttpStatusCode> SubscribeCourse(int courseId);

        HttpStatusCode UnsubscribeCourse(int courseId);

        void CourseNotify(Course course, DbUser user, int userCoursesId);

        void DeleteUserJobs(string userId, int courseId);
    }
}
