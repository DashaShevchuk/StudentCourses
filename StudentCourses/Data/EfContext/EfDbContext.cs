using StudentCourses.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentCourses.Data.Configurations;
using StudentCourses.Data.Entities;

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

        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<Image> Image { get; set; }
        public virtual DbSet<UserCourses> UserCourse { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new CourseConfiguration());
            modelBuilder.ApplyConfiguration(new ImageConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserConfiguration());
            modelBuilder.ApplyConfiguration(new DbRoleConfiguration());
            modelBuilder.ApplyConfiguration(new UserCoursesConfiguration());
        }
    }
}
