using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudentCourses.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasMany(e => e.UserCourses)
                .WithOne(e => e.Course);

            builder.Property(e => e.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(e => e.DateStart)
                .IsRequired();

            builder.Property(e => e.ShortDescription)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.LongDescription)
                .HasMaxLength(1000)
                .IsRequired();

            builder.Property(e => e.Duration)
                .IsRequired();

            builder.Property(e => e.Image)
                .IsRequired();
        }
    }
}
