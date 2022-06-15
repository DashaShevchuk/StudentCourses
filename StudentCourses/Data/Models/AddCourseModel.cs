using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class AddCourseModel
    {
        public IFormFile File { get; set; }

        public string Name { get; set; }

        public string DateStart { get; set; }

        //public DateTime DateStart { get; set; }

        public string ShortDescription { get; set; }

        public string LongDescription { get; set; }

        public int Duration { get; set; }
    }
}
