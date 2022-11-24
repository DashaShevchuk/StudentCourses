using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class GetCoursesModel
    {
        public List<CourseModel> Courses { get; set; }

        public int TotalCount { get; set; }
    }
}
