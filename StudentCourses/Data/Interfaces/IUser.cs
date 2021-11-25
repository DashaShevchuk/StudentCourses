using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Interfaces
{
    public interface IUser
    {
        Task<bool> RegistrUserAsync(RegistrationModel model);
        IEnumerable<DbUser> GetUser();
    }
}
