using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class Duration
    {
        public int Id { get; set; }
        public string Weeks { get; set; }
        public virtual ICollection<Course> Course { get; set; }
    }
}
