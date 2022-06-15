using StudentCourses.Data.Entities;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Interfaces.CoursesInterfaces
{
    public interface ICourseCommands
    { 
        void RemoveCourse(Course course);

        void RemoveUserCourses(int courseId);

        void EditCourse(Course course, EditCourseModel model);

        void CreateCourse(Course course);
    }
}
