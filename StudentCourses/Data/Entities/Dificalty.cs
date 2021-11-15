using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class Dificalty
    {
        public int Id { get; set; }
        public string Dificalt { get; set; }
        public virtual Collection<Course> Courses { get; set; }
    }
}
