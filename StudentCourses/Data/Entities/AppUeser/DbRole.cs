using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities.AppUeser
{
    public class DbRole : IdentityRole<string>
    {
        public virtual ICollection<DbUserRole> UserRoles { get; set; }
        public string Description { get; set; }
    }
}
