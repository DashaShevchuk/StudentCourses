using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Interfaces.UserInterfaces;
using StudentCourses.Data.Models;
using StudentCourses.Hallpers;
using StudentCourses.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Features.Courses
{
    public class CourseCommands : ICourseCommands
    {
        private readonly EfDbContext context;
        private readonly ICourseQueries courseQueries;
        private readonly IUserQueries userQueries;

        public CourseCommands(EfDbContext Context, ICourseQueries CourseQueries, IUserQueries UserQueries)
        {
            context = Context;
            courseQueries = CourseQueries;
            userQueries = UserQueries;
        }

        public void CreateCourse(Course course)
        {
            context.Course.Add(course);
            context.SaveChanges();
        }

        public void EditCourse(Course course, EditCourseModel model)
        {
            if (course.Name != model.Name)
            {
                course.Name = model.Name;
            }

            if (course.ShortDescription != model.ShortDescription)
            {
                course.ShortDescription = model.ShortDescription;
            }

            if (course.LongDescription != model.LongDescription)
            {
                course.LongDescription = model.LongDescription;
            }

            if (course.DateStart.ToString() != model.DateStart)
            {
                course.DateStart = DateTime.Parse(model.DateStart);
            }

            if (course.Duration != model.Duration)
            {
                course.Duration = model.Duration;
            }

            context.SaveChanges();
        }

        public void RemoveCourse(Course course)
        {
            context.Course.Remove(course);
            context.SaveChanges();
        }

        public void RemoveUserCourses(int courseId)
        {
            var userCourses = courseQueries.GetUserCoursesByCourseId(courseId);
            if (userCourses != null)
            {
                var userJobs = userQueries.GetHangfireJobsBuCourseId(userCourses, courseId);
                if (userJobs != null)
                {
                    context.HangfireJobs.RemoveRange(userJobs);
                }
                context.UserCourse.RemoveRange(userCourses);
                context.SaveChanges();
            }
        }
    }
}
