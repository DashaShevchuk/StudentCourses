using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class HangfireJobs
    {
        public string JobId { get; set; }

        public int UserCoursesId { get; set; }
        public UserCourses UserCourses { get; set; }
    }
}
