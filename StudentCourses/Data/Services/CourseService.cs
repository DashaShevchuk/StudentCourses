using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;

namespace StudentCourses.Data.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseCommands courseCommands;
        private readonly ICourseQueries courseQueries;
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration configuration;
        private readonly EfDbContext context;
        private readonly IHttpContextAccessor contextAccessor;

        public CourseService(EfDbContext Context, 
                             ICourseCommands CourseCommands,
                             ICourseQueries CourseQueries, 
                             IWebHostEnvironment Env, 
                             IConfiguration Configuration, 
                             IHttpContextAccessor ContextAccessor)
        {
            courseCommands = CourseCommands;
            courseQueries = CourseQueries;
            env = Env;
            configuration = Configuration;
            context = Context;
            contextAccessor = ContextAccessor;
        }

        public string GetCurrentUserId()
        {
            return contextAccessor.HttpContext.User.Claims.FirstOrDefault().Value;
        }

        public IEnumerable<GetCoursesModel> GetCourses()
        {
            var userId = GetCurrentUserId();
            return courseQueries.GetCourses(userId);
        }

        public IEnumerable<GetCoursesModel> GetUserCourses(string userId)
        {
            return courseQueries.GetUserCourses(userId);
        }

        public HttpStatusCode AddCourse(AddCourseModel model)
        {
            var newCourse = new Course
            {
                Name = model.Name,
                DateStart = DateTime.Parse(model.DateStart),
                Duration = model.Duration,
                ShortDescription = model.ShortDescription,
                LongDescription = model.LongDescription,
            };

            string newImageName = Guid.NewGuid().ToString() + ".jpg";
            string fileDestDir = env.ContentRootPath;
            foreach (var pathConfig in new string[] { "ImagesPath", "ImagesCoursesPath" })
            {
                fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
            }
            if (model.File.Length > 0)
            {
                using (var fileStream = new FileStream(Path.Combine(fileDestDir, newImageName), FileMode.Create))
                {
                    model.File.CopyTo(fileStream);
                    newCourse.Image = newImageName;
                    context.SaveChanges();
                }
            }

            courseCommands.CreateCourse(newCourse);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode ChangeImage(ChangeImage model)
        {
            var courseToChangeImage = courseQueries.FindCourseById(model.CourseId);
            if (courseToChangeImage == null)
            {
                return HttpStatusCode.NotFound;
            }

            string folderPath = $"Uploaded/{configuration.GetValue<string>("CoursesUrlImages")}/";
            string imageName = courseToChangeImage.Image;

            DirectoryInfo imageDirectory = new DirectoryInfo(folderPath);

            FileInfo[] files = imageDirectory.GetFiles();

            foreach (FileInfo file in files)
            {
                if (file.Name == imageName)
                {
                    file.Delete();
                }
            }

            string newImageName = Guid.NewGuid().ToString() + ".jpg";
            string fileDestDir = env.ContentRootPath;
            foreach (var pathConfig in new string[] { "ImagesPath", "ImagesCoursesPath" })
            {
                fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
            }
            if (model.File.Length > 0)
            {
                using (var fileStream = new FileStream(Path.Combine(fileDestDir, newImageName), FileMode.Create))
                {
                    model.File.CopyTo(fileStream);
                    courseToChangeImage.Image = newImageName;
                    context.SaveChanges();
                }
            }

            return HttpStatusCode.OK;
        }

        public HttpStatusCode DeleteCourse(int corseId)
        {
            if(corseId == 0)
            {
                return HttpStatusCode.BadRequest;
            }

            var courseToDelete = courseQueries.FindCourseById(corseId);
            if (courseToDelete == null)
            {
                return HttpStatusCode.NotFound;
            }

            string folderPath = $"Uploaded/{configuration.GetValue<string>("CoursesUrlImages")}/";
            string imageName = courseToDelete.Image;
        
            DirectoryInfo imageDirectory = new DirectoryInfo(folderPath);

            FileInfo[] files = imageDirectory.GetFiles();

            foreach (FileInfo file in files)
            {
                if (file.Name == imageName)
                {
                    file.Delete();
                }
            }

            courseCommands.RemoveUserCourses(courseToDelete.Id);
            courseCommands.RemoveCourse(courseToDelete);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode EditCourse(EditCourseModel model)
        {
            var courseToEdit = courseQueries.FindCourseById(model.Id);
            if (courseToEdit == null)
            {
                return HttpStatusCode.NotFound;
            }

            courseCommands.EditCourse(courseToEdit, model);

            return HttpStatusCode.OK;
        }
    }
}