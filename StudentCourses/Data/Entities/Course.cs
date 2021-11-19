using StudentCourses.Data.Entities.AppUeser;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class Course
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime DateStart { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public int Duration { get; set; }
        
        public Image Image { get; set; }
        public virtual ICollection<UserCourses> UserCourses { get; set; }
    }
}
