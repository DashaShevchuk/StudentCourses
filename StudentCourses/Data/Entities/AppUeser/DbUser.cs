using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities.AppUeser
{
    public class DbUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }

        public Image Image { get; set; }
        public virtual ICollection<UserCourses> UserCourses { get; set; }
        public virtual ICollection<DbUserRole> UserRoles { get; set; }
    }
}
