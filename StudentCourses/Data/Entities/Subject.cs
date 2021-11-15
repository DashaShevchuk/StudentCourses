using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        public string Theme { get; set; }
        public string IconPath { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}
