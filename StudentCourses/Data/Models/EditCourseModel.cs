using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class EditCourseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DateStart { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public int Duration { get; set; }
        public string Image { get; set; }
    }
}
