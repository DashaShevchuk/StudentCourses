using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudentCourses.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Configurations
{
    public class UserCoursesConfiguration : IEntityTypeConfiguration<UserCourses>
    {
        public void Configure(EntityTypeBuilder<UserCourses> builder)
        {
           // builder.HasKey(x => new { x.CourseId, x.UserId });

            builder.HasOne(e => e.User)
                .WithMany(e => e.UserCourses)
                .HasForeignKey(e => e.UserId)
                .IsRequired();

            builder.HasOne(e => e.Course)
                .WithMany(e => e.UserCourses)
                .HasForeignKey(e => e.CourseId)
                .IsRequired();

            //builder.HasOne(e => e.HangfireJobs)
            //  .WithOne(e => e.UserCourses);

            //builder.HasMany(e => e.HangfireJobs)
            //      .WithOne(e => e.UserCourses);

            builder.HasMany(e => e.HangfireJobs)
                .WithOne(e => e.UserCourses)
                .HasForeignKey(e => e.UserCoursesId)
                .IsRequired();
        }
    }
}
