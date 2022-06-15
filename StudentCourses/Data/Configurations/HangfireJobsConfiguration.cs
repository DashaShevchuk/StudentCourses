using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudentCourses.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Configurations
{
    public class HangfireJobsConfiguration: IEntityTypeConfiguration<HangfireJobs>
    {
        public void Configure(EntityTypeBuilder<HangfireJobs> builder)
        {
            //builder.HasOne(x => x.UserCourses)
            //   .WithOne(x => x.HangfireJobs)
            //   .HasForeignKey<UserCourses>(x => x.HangfireJobsId);


            //builder.HasOne(e => e.UserCourses)
            //    .WithMany(e => e.HangfireJobs)
            //    .HasForeignKey(e => e.JobId)
            //    .IsRequired();
            
            builder.HasKey(nameof(HangfireJobs.JobId));

            builder.HasOne(e => e.UserCourses)
                  .WithMany(e => e.HangfireJobs);
        }
    }
}
