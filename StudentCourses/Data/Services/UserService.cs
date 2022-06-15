using Hangfire;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Interfaces.UserInterfaces;
using StudentCourses.Data.Models;
using StudentCourses.Services.EmailSender;
using StudentCourses.Services.ViewHellper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace StudentCourses.Data.Repositories
{
    public class UserService : IUserService
    {
        private readonly EfDbContext context;
        private readonly IUserCommands userCommands;
        private readonly IUserQueries userQueries;
        private readonly ICourseQueries courseQueries;
        private readonly IHttpContextAccessor contextAccessor;
        private readonly IEmailSender emailSender;
        private readonly IBackgroundJobClient backgroundJobs;
        private readonly IViewHellper viewHellper;
        private readonly UserManager<DbUser> userManager;
        private readonly IConfiguration configuration;

        public UserService(EfDbContext Context, 
                           IUserCommands UserCommands, 
                           IUserQueries UserQueries,
                           ICourseQueries CourseQueries,
                           IHttpContextAccessor ContextAccessor,
                           IEmailSender EmailSender,
                           IBackgroundJobClient BackgroundJobs,
                           IViewHellper ViewHellper,
                           UserManager<DbUser> UserManager,
                           IConfiguration Configuration)
        {
            context = Context;
            userCommands = UserCommands;
            userQueries = UserQueries;
            courseQueries = CourseQueries;
            contextAccessor = ContextAccessor;
            emailSender = EmailSender;
            backgroundJobs = BackgroundJobs;
            viewHellper = ViewHellper;
            userManager = UserManager;
            configuration = Configuration;
        }

        public string GetCurrentUserId()
        {
            return contextAccessor.HttpContext.User.Claims.FirstOrDefault().Value;
        }

        public async Task<HttpStatusCode> RegistrUser(RegistrationModel model)
        {
            if (model.Password == model.PasswordConfirm)
            {
                var newUser = new DbUser
                {
                    Name = model.Name,
                    LastName = model.LastName,
                    UserName = model.Name,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    DateOfBirth = model.DateOfBirth,
                    EmailConfirmed = false
                };

                var createUserResult = await userCommands.CreateUser(newUser, model.Password);
                if (createUserResult == null)
                {
                    return HttpStatusCode.NoContent;
                }

                var setUserRoleResult = await userCommands.SetUserRole(newUser, "User");
                if (setUserRoleResult == null)
                {
                    return HttpStatusCode.NoContent;
                }

                var token = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
                token = System.Web.HttpUtility.UrlEncode(token);

                string appDomain = configuration.GetSection("AppDomain").Value;
                string confirmationLink = configuration.GetSection("EmailConfirmation").Value;

                string callback = string.Format(appDomain + confirmationLink, token);

                var confirmModel = new ConfirmAccountModel
                {
                    UserName = newUser.Name,
                    ConfirmationLink = callback
                };

                string body = await viewHellper.RenderViewToStringAsync("~/Templates/EmailTemplates/ConfirmAccount.cshtml", confirmModel);

                emailSender.SendEmail(newUser.Email, "Please confirm your email", body);

                return HttpStatusCode.OK;
            }
            else
            {
                return HttpStatusCode.BadRequest;
            }
        }

        public async Task<HttpStatusCode> DeleteUser(string id)
        {
            if(id == " ")
            {
                return HttpStatusCode.BadRequest;
            }

            var user = await userQueries.FindUserById(id);
            if(user == null)
            {
                return HttpStatusCode.NotFound;
            }

            var logins = await userQueries.GetUserLogins(user);
            if(logins == null)
            {
                return HttpStatusCode.NotFound;
            }

            var rolesForUser = await userQueries.GetUserRoles(user);
            if(rolesForUser == null)
            {
                return HttpStatusCode.NotFound;
            }

            userCommands.RemoveUserCourses(id);

            using (var transaction = context.Database.BeginTransaction())
            {
                IdentityResult result = IdentityResult.Success;

                foreach (var login in logins)
                {
                    result = await userCommands.RemoveUserLoggins(user, login);
                    if (result != IdentityResult.Success)
                    {
                        break;
                    }
                }

                if (result == IdentityResult.Success)
                {
                    foreach (var item in rolesForUser)
                    {
                        result = await userCommands.RemoveUserRole(user, item);
                        if (result != IdentityResult.Success)
                        {
                            break;
                        }
                    }
                }

                if (result == IdentityResult.Success)
                {
                    result = await userCommands.DeleteUser(user);
                    if (result == IdentityResult.Success)
                    {
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Rollback();
                    }
                }
            }

            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> EditUser(EditUserModel model)
        {
            DbUser editedUser = await userQueries.FindUserById(model.Id);
            if(editedUser == null)
            {
                return HttpStatusCode.NotFound;
            }

            IdentityResult editResult = await userCommands.EditUser(editedUser, model);
            if (editResult == null)
            {
                return HttpStatusCode.NoContent;
            }

            return HttpStatusCode.OK;
        }

        public IEnumerable<UsersModel> SortUsers(IEnumerable<UsersModel> users, string columnKey, string sortOrder)
        {
            if (columnKey == "name")
            {
                if (sortOrder == "ascend")
                {
                    return users.OrderBy(x => x.Name);
                }
                else
                {
                    return users.OrderByDescending(x => x.Name);
                }
            }
            if (columnKey == "lastName")
            {
                if (sortOrder == "ascend")
                {
                    return users.OrderBy(x => x.LastName);
                }
                else
                {
                    return users.OrderByDescending(x => x.LastName);
                }
            }
            else if (columnKey == "dateOfBirth")
            {
                if (sortOrder == "ascend")
                {
                    return users.OrderBy(x => x.DateOfBirth);
                }
                else
                {
                    return users.OrderByDescending(x => x.DateOfBirth);
                }
            }
            return users;
        }

        public async Task<GetUsersModel> GetUsers(UsersPageModel model)
        {
            IEnumerable<UsersModel> users = await userQueries.GetUsers();
            int count = users.Count();
            int skipPage = (model.Page - 1) * model.PageSize;

            if (model.SearchString != null)
            {
                users = users.Where(x => x.Name.ToLower().StartsWith(model.SearchString.ToLower())
                                         || x.LastName.ToLower().StartsWith(model.SearchString.ToLower())
                                         || x.Email.ToLower().StartsWith(model.SearchString.ToLower())
                                         || x.PhoneNumber.Contains(model.SearchString)
                                         || x.TextDateOfBirth.Contains(model.SearchString));
            }

            if (model.SortOrder != null && model.ColumnKey != null)
            {
                users = SortUsers(users, model.ColumnKey, model.SortOrder);
            }

            users = users.Skip(skipPage).Take(model.PageSize);
            
            var resultModel = new GetUsersModel
            {
                Users = users.ToList(),
                TotalCount = count
            };
            return resultModel;
        }

        public async Task<HttpStatusCode> SubscribeCourse(int courseId)
        {
            var userId = GetCurrentUserId();

            if (courseId == 0 || userId == null)
            {
                return HttpStatusCode.BadRequest;
            }

            DbUser user = await userQueries.FindUserById(userId);
            Course course = courseQueries.FindCourseById(courseId);

            var userCourse = new UserCourses
            {
                UserId = userId,
                CourseId = courseId,
                DateJoin = DateTime.Now
            };

            userCommands.SubscribeCourse(userCourse);

            EmailCourseModel subscribeModel = new EmailCourseModel
            {
                UserName = user.Name,
                CourseName = course.Name,
                ShortDescription = course.ShortDescription
            };

            string body = await viewHellper.RenderViewToStringAsync("~/Templates/EmailTemplates/SubscribeCourse.cshtml", subscribeModel);

            backgroundJobs.Enqueue(() => emailSender.SendEmail(user.Email, "Thank you for subscribing", body));

            CourseNotify(course, user, userCourse.Id);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode UnsubscribeCourse(int courseId)
        {
            var userId = GetCurrentUserId();

            if (courseId == 0)
            {
                return HttpStatusCode.BadRequest;
            }

            DeleteUserJobs(userId, courseId);

            userCommands.UnsubscribeCourse(userId, courseId);

            return HttpStatusCode.OK;
        }

        public async void CourseNotify(Course course, DbUser user, int userCoursesId)
        {
            EmailCourseModel notifyModel = new EmailCourseModel
            {
                UserName = user.Name,
                CourseName = course.Name,
                ShortDescription = course.ShortDescription,
                NotifyType = "tomorrow",
                DateStart = course.DateStart.ToString("dd.MM.yyyy")
            };

            string dayNotifyEmailBody = await viewHellper.RenderViewToStringAsync("~/Templates/EmailTemplates/NotifyCourse.cshtml", notifyModel);
            string dayNotifyJobId = backgroundJobs.Schedule(() => emailSender.SendEmail(user.Email, "The course will begin soon", dayNotifyEmailBody), course.DateStart.AddDays(-1) + new TimeSpan(8, 0, 0));

            var dayNotifyJob = new HangfireJobs
            {
                JobId = dayNotifyJobId,
                UserCoursesId = userCoursesId
            };

            userCommands.CreateJob(dayNotifyJob);

            notifyModel.NotifyType = "in a week";
            string weekNotifyEmailBody = await viewHellper.RenderViewToStringAsync("~/Templates/EmailTemplates/NotifyCourse.cshtml", notifyModel);
            string weekNotifyJobId = backgroundJobs.Schedule(() => emailSender.SendEmail(user.Email, "The course will begin soon", weekNotifyEmailBody), course.DateStart.AddDays(-7));

            var weekNotifyJob = new HangfireJobs
            {
                JobId = weekNotifyJobId,
                UserCoursesId = userCoursesId
            };

            userCommands.CreateJob(weekNotifyJob);

            notifyModel.NotifyType = "in a month";
            string monthNotifyEmailBody = await viewHellper.RenderViewToStringAsync("~/Templates/EmailTemplates/NotifyCourse.cshtml", notifyModel);
            string monthNotifyJobId = backgroundJobs.Schedule(() => emailSender.SendEmail(user.Email, "The course will begin soon", monthNotifyEmailBody), course.DateStart.AddMonths(-1));

            var monthNotifyJob = new HangfireJobs
            {
                JobId = monthNotifyJobId,
                UserCoursesId = userCoursesId
            };

            userCommands.CreateJob(monthNotifyJob);
        }

        public void DeleteUserJobs(string userId, int courseId)
        {
            var jobs = userQueries.GetHangfireJobs(userId, courseId);
            //добавить трай кетч
            foreach (var job in jobs)
            {
                BackgroundJob.Delete(job.JobId);
            }
        }
        public async Task<HttpStatusCode> ConfirmationEmail(string token)
        {

            return HttpStatusCode.OK;
        }
    }
}
