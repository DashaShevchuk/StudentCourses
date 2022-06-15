using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class GetCoursesModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string TextDateStart { get; set; }

        public DateTime DateStart { get; set; }

        public string ShortDescription { get; set; }

        public string LongDescription { get; set; }

        public int Duration { get; set; }

        public string Image { get; set; }

        public bool IsUserSubscribe { get; set; }

        public string DateSubscribe { get; set; }
    }
}
