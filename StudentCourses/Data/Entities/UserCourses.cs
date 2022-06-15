using StudentCourses.Data.Entities.AppUeser;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class UserCourses
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public  virtual DbUser User { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public DateTime DateJoin { get; set; }

        public virtual ICollection<HangfireJobs> HangfireJobs { get; set; }
    }
}
