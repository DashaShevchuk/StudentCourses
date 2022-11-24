using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Models;
using StudentCourses.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Features.Courses
{
    public class CourseQueries : ICourseQueries
    {
        private readonly EfDbContext context;
        private readonly IConfiguration configuration;
        public CourseQueries(EfDbContext Context, IConfiguration Configuration)
        {
            context = Context;
            configuration = Configuration;
        }

        public Course FindCourseById(int id)
        {
            return context.Course.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<CourseModel> GetCourses(string userId)
        {
            string path = $"{configuration.GetValue<string>("CoursesUrlImages")}/";
            List<CourseModel> courses = new List<CourseModel>();
            foreach(var item in context.Course)
            {
                CourseModel course = new CourseModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    TextDateStart = item.DateStart.ToString("dd.MM.yyyy"),
                    DateStart = item.DateStart,
                    ShortDescription = item.ShortDescription,
                    LongDescription = item.LongDescription,
                    Duration = item.Duration,
                    Image = item.Image != null ? path + item.Image : path + configuration.GetValue<string>("DefaultImage"),
                };
                var userCourse = context.UserCourse.FirstOrDefault(x => x.CourseId == item.Id && x.UserId == userId);
                if (userCourse != null)
                {
                    course.IsUserSubscribe = true;
                }
                else
                {
                    course.IsUserSubscribe = false;
                }
                courses.Add(course);
            }

            return courses;
        }

        public IEnumerable<CourseModel> GetUserCourses(string userId)
        {
            string path = $"{configuration.GetValue<string>("CoursesUrlImages")}/";
            IEnumerable<CourseModel> courses = context.UserCourse.Where(x => x.UserId == userId).Select(c => new CourseModel
            {
                Id = c.Course.Id,
                Name = c.Course.Name,
                TextDateStart = c.Course.DateStart.ToString("dd.MM.yyyy"),
                DateStart = c.Course.DateStart,
                ShortDescription = c.Course.ShortDescription,
                LongDescription = c.Course.LongDescription,
                Duration = c.Course.Duration,
                Image = c.Course.Image != null ? path + c.Course.Image : path + configuration.GetValue<string>("DefaultImage"),
                DateSubscribe = c.DateJoin.ToString("dd.MM.yyyy")
            });

            return courses;
        }

        public IEnumerable<UserCourses> GetUserCoursesByCourseId(int courseId)
        {
            return context.UserCourse.Where(x => x.CourseId == courseId);
        }
    }
}
