using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.Entities;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace StudentCourses.Data.Interfaces.CoursesInterfaces
{
    public interface ICourseService
    {
        IEnumerable<GetCoursesModel> GetCourses();

        IEnumerable<GetCoursesModel> GetUserCourses(string userId);

        HttpStatusCode AddCourse(AddCourseModel model);

        HttpStatusCode DeleteCourse(int id);

        HttpStatusCode EditCourse(EditCourseModel model);

        HttpStatusCode ChangeImage(ChangeImage model);
    }
}
