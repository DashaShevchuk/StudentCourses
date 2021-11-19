using StudentCourses.Data.Entities.AppUeser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class Image
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public DbUser User { get; set; }
        public Course Course { get; set; }
    }
}
