using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class EmailCourseModel
    {
        public string UserName { get; set; }

        public string CourseName { get; set; }

        public string ShortDescription { get; set; }

        public string NotifyType { get; set; }

        public string DateStart { get; set; }
    }
}
