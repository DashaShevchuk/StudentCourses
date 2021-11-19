using StudentCourses.Data.Entities.AppUeser;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Configurations
{
    public class DbUserConfiguration : IEntityTypeConfiguration<DbUser>
    {
        public void Configure(EntityTypeBuilder<DbUser> builder)
        {
            builder.HasMany(e => e.UserRoles)
                .WithOne(e => e.User);

            builder.HasOne(e => e.Image)
                .WithOne(e => e.User)
                .HasForeignKey<DbUser>(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
