using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Entities.AppUeser
{
    public class DbUser : IdentityUser
    {
        public BaseProfile BaseProfile { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<DbUserRole> UserRoles { get; set; }
    }
}
