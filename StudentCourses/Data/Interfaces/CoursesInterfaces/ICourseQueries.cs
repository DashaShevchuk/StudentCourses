﻿using StudentCourses.Data.Entities;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Interfaces.CoursesInterfaces
{
    public interface ICourseQueries
    {
        IEnumerable<GetCoursesModel> GetCourses(string userId);

        IEnumerable<GetCoursesModel> GetUserCourses(string userId);

        Course FindCourseById(int id);

        IEnumerable<UserCourses> GetUserCoursesByCourseId(int courseId);
    }
}
