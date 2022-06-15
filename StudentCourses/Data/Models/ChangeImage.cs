using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class ChangeImage
    {
        public IFormFile File { get; set; }
        public int CourseId { get; set; }
    }
}
