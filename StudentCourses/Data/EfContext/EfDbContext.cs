using FurnitureStore.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentCourses.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.EfContext
{
    public class EfDbContext : IdentityDbContext<DbUser, DbRole, string, IdentityUserClaim<string>,
    DbUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EfDbContext(DbContextOptions<EfDbContext> options)
            : base(options)
        {

        }
        public virtual DbSet<BaseProfile> BaseProfiles { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet <Dificalty> Dificalties { get; set; }
        public virtual DbSet<Duration> Durations { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
    }
}
